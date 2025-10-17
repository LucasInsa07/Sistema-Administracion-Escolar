"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth, logout } from "@/lib/auth"

type Props = {
  children: React.ReactNode
}

// Module-level flag to remember that this tab already performed the initial validation.
// This prevents re-running validation/redirect logic on internal navigations within the same tab.
let tabInitialChecked = false

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const [valid, setValid] = useState<boolean | null>(null)
  useEffect(() => {
    const THRESHOLD_SECONDS = 120

    const parseJwt = (token: string) => {
      try {
        const parts = token.split('.')
        if (parts.length !== 3) return null
        const payload = parts[1]

        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')

        const pad = b64.length % 4
        const padded = pad ? b64 + '='.repeat(4 - pad) : b64
        const json = atob(padded)
        return JSON.parse(json)
      } catch (e) {
        return null
      }
    }

    const validate = async () => {
      const { token } = getAuth()
      const initialKey = 'auth:initialChecked'
      const initialChecked = typeof window !== 'undefined' ? sessionStorage.getItem(initialKey) : null

      // If this tab already performed the initial check, or sessionStorage indicates it was done
      if (initialChecked) {
        // ensure module-level flag is set for this tab
        tabInitialChecked = true
      }

      if (tabInitialChecked) {
        const payload = parseJwt(token || '')
        const now = Math.floor(Date.now() / 1000)
        const secondsLeft = payload && payload.exp ? payload.exp - now : -1
        if (secondsLeft > 0) {
          setValid(true)
          return
        }
        // expired -> logout
        logout()
        setValid(false)
        router.replace('/login')
        return
      }


      if (!token) {
        setValid(false)
        router.replace('/login')
        return
      }

      const payload = parseJwt(token)
      if (!payload || typeof payload.exp !== 'number') {

        logout()
        setValid(false)
        router.replace('/login')
        return
      }

      const now = Math.floor(Date.now() / 1000)
      const secondsLeft = payload.exp - now

      if (secondsLeft <= 0) {

        logout()
        setValid(false)
        router.replace('/login')
        return
      }

      // If this is the first validation in this browser session, perform the more thorough check
      if (!initialChecked) {
        try {
          if (secondsLeft <= THRESHOLD_SECONDS) {
            // token near expiry, confirm with backend
            const res = await fetch('/api/v1/auth/validate', {
              method: 'GET',
              headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            })
            if (!res.ok) {
              logout()
              setValid(false)
              router.replace('/login')
              return
            }
          }
          // mark initial check done for this session so subsequent mounts don't re-run backend check
          try { sessionStorage.setItem(initialKey, '1') } catch (e) { /* ignore */ }
          tabInitialChecked = true
          setValid(true)
          return
        } catch (e) {
          // network error during initial check: allow the session for now but mark as valid
          console.warn('Initial token validation failed due to network error, allowing session:', e)
          try { sessionStorage.setItem(initialKey, '1') } catch (e) { /* ignore */ }
          tabInitialChecked = true
          setValid(true)
          return
        }
      }

      // Not the first check in this session: do a lightweight local-only validation (no backend calls)
      if (secondsLeft > 0) {
        setValid(true)
      } else {
        logout()
        setValid(false)
        router.replace('/login')
      }
    }

    validate()
    // we intentionally run validation only on mount to avoid repeated checks (e.g., tab changes)
  }, [])

  // while validating, don't render children
  if (valid === null) return null

  return <>{children}</>
}
