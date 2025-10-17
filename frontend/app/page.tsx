import { redirect } from "next/navigation"

export default function Page() {
  // Redirect root to the login page so users must authenticate first.
  redirect("/login")
}
