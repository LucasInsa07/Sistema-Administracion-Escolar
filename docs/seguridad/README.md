# DOCUMENTACIÓN DE SEGURIDAD - SISTEMA GESTIÓN ESCOLAR

## 📋 ÍNDICE DE CONTENIDOS

1. [Arquitectura de Seguridad](#1-arquitectura-de-seguridad)
2. [Autenticación JWT](#2-autenticación-jwt)
3. [Gestión de Contraseñas](#3-gestión-de-contraseñas)
4. [Control de Accesos (CORS)](#4-control-de-accesos-cors)
5. [Validaciones y Sanitización](#5-validaciones-y-sanitización)
6. [Configuración de Seguridad](#6-configuración-de-seguridad)
7. [Mejores Prácticas](#7-mejores-prácticas)
8. [Checklist de Seguridad](#8-checklist-de-seguridad)

---

## 1. ARQUITECTURA DE SEGURIDAD

### 🏗️ **Componentes Principales**

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Frontend)                    │
├─────────────────────────────────────────────────────────┤
│ • Next.js App                                           │
│ • JWT Token Storage                                     │
│ • Authorization Headers                                 │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTPS + JWT
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   SPRING SECURITY                       │
├─────────────────────────────────────────────────────────┤
│ • CORS Configuration                                    │
│ • JWT Authentication Filter                            │
│ • Security Filter Chain                                │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                  BUSINESS LAYER                         │
├─────────────────────────────────────────────────────────┤
│ • Controllers (Endpoints)                              │
│ • Services (Business Logic)                            │
│ • PasswordService (BCrypt)                             │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                            │
├─────────────────────────────────────────────────────────┤
│ • JPA Repositories                                     │
│ • Database (MySQL/PostgreSQL/H2)                      │
│ • Encrypted Passwords (BCrypt)                         │
└─────────────────────────────────────────────────────────┘
```

### 🎯 **Principios de Seguridad Implementados**

- ✅ **Autenticación Stateless** (JWT)
- ✅ **Cifrado de Contraseñas** (BCrypt)
- ✅ **CORS Configurado** para frontend específico
- ✅ **Validaciones de Entrada** en todos los endpoints
- ✅ **Separación de Responsabilidades** por capas

---

## 2. AUTENTICACIÓN JWT

### 🔐 **Implementación JWT**

#### **Archivo:** `JwtService.java`

```java
// Configuración JWT
SecretKey: HMAC-SHA256
Algoritmo: HS256
Expiración: 3600000ms (1 hora por defecto)
Claims: username, role, iat, exp
```

#### **Estructura del Token:**

```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "admin@escola.com",
    "role": "ADMIN",
    "iat": 1635724800,
    "exp": 1635728400
  },
  "signature": "HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret)"
}
```

### 🔄 **Flujo de Autenticación JWT**

```
1. LOGIN REQUEST
   POST /api/auth/login
   Body: { "email": "admin@escola.com", "password": "admin123" }
         ↓
2. CREDENTIAL VALIDATION
   • Buscar usuario en BD
   • Validar password con BCrypt
   • ¿Credenciales válidas?
         ↓
3. TOKEN GENERATION
   JwtService.generateToken(username, claims)
   • Subject: username
   • Claims: role, permissions
   • Expiration: current + 1 hour
         ↓
4. TOKEN RESPONSE
   Response: { 
     "token": "eyJhbGciOiJIUzI1NiJ9...",
     "expiresIn": 3600,
     "role": "ADMIN"
   }
         ↓
5. CLIENT STORAGE
   localStorage/sessionStorage
   Headers: Authorization: Bearer <token>
         ↓
6. SUBSEQUENT REQUESTS
   JwtAuthenticationFilter intercepts
   • Extract token from Authorization header
   • Validate signature and expiration
   • Set SecurityContext
         ↓
7. ACCESS GRANTED/DENIED
```

### ⚙️ **Configuración JWT**

```properties
# application.properties
app.security.jwt.secret=change-me-secret-change-me-secret-key-minimum-32-chars
app.security.jwt.expiration-ms=3600000
```

### 🛡️ **JWT Security Features**

- ✅ **Secret Key**: Mínimo 32 caracteres HMAC-SHA256
- ✅ **Expiration**: Tokens con tiempo límite configurable
- ✅ **Stateless**: No se almacena estado en servidor
- ✅ **Claims Validation**: Verificación de firma y expiración
- ✅ **Automatic Extraction**: Header Authorization: Bearer <token>

---

## 3. GESTIÓN DE CONTRASEÑAS

### 🔒 **PasswordService Implementation**

#### **Generación Automática de Contraseñas**

```java
// Para alumnos: Basado en fecha de nacimiento
Formato: AL + DD + MM + YY
Ejemplo: 
  Fecha: 15/03/2005
  Password: AL150305
  
// Proceso:
1. Extraer día, mes, año de fecha nacimiento
2. Formatear como AL + DD + MM + YY  
3. Hashear con BCrypt
4. Almacenar hash en BD
```

#### **Hashing con BCrypt**

```java
// Configuración BCrypt
Algoritmo: BCrypt
Rounds: 12 (por defecto Spring Security)
Salt: Generado automáticamente por BCrypt

// Ejemplo de hash generado:
Input: "AL150305"
Hash: "$2a$12$Xkjsd9k2k.../asdASD123MNhash.encoded.password"
```

### 🔐 **Flujo de Validación de Contraseña**

```
VALIDACIÓN DE CONTRASEÑA:

1. USUARIO INGRESA CREDENCIALES
   Input: email + password (texto plano)
         ↓
2. BUSCAR USUARIO EN BD
   SELECT * FROM usuarios WHERE email = ?
         ↓
3. OBTENER HASH ALMACENADO
   passwordHash = usuario.getContrasena()
         ↓
4. VALIDAR CON BCRYPT
   boolean valid = BCrypt.checkpw(passwordPlano, passwordHash)
         ↓
5. RESULTADO
   ├── true → Autenticación exitosa → Generar JWT
   └── false → Error 401 Unauthorized
```

### 🎯 **Políticas de Contraseñas**

#### **Para Alumnos (Generadas Automáticamente)**
- ✅ **Formato fijo**: `AL + DDMMYY`
- ✅ **Longitud**: 8 caracteres
- ✅ **Basada en fecha**: Fácil de recordar/recuperar
- ✅ **Única por alumno**: Fecha de nacimiento única

#### **Para Administradores (Configuradas)**
- ✅ **Longitud mínima**: 8+ caracteres (recomendado)
- ✅ **Complejidad**: Alfanumérica recomendada
- ✅ **Hash seguro**: BCrypt con salt automático

---

## 4. CONTROL DE ACCESOS (CORS)

### 🌐 **Configuración CORS**

#### **Orígenes Permitidos**
```java
// SecurityConfig.java
Orígenes por defecto:
- http://administracion.thomasruizdiaz.com
- https://administracion.thomasruizdiaz.com  
- http://localhost:3000
- https://localhost:3000

// Configurable via environment:
app.cors.allowed-origins=https://midominio.com,http://localhost:3000
```

#### **Configuración Completa**
```java
CORS Configuration:
├── allowedOriginPatterns: dominios específicos
├── allowedMethods: GET, POST, PUT, PATCH, DELETE, OPTIONS
├── allowedHeaders: * (todos)
├── exposedHeaders: Authorization, Set-Cookie
├── allowCredentials: true
└── maxAge: 3600s (1 hora)
```

### 🛡️ **Seguridad CORS**

- ✅ **Orígenes Específicos**: No wildcard (*) en producción
- ✅ **Métodos Controlados**: Solo métodos necesarios
- ✅ **Credenciales**: Permitidas para JWT en headers
- ✅ **Preflight**: Manejo automático de OPTIONS requests
- ✅ **Headers Seguros**: Exposición controlada de headers

---

## 5. VALIDACIONES Y SANITIZACIÓN

### 🔍 **Validaciones de Entrada**

#### **Validaciones Bean Validation (JSR-303)**

```java
// Ejemplos implementados:

@Entity
public class Alumno {
    @NotBlank(message = "El nombre no puede estar vacío")
    private String nombre;
    
    @Email(message = "El email debe tener un formato válido") 
    @Column(nullable = false, unique = true)
    private String email;
    
    @NotNull(message = "La fecha de nacimiento no puede estar vacía")
    private LocalDate fechaNacimiento;
}
```

#### **Validaciones Implementadas**

| Campo | Validación | Mensaje |
|-------|------------|---------|
| `nombre` | @NotBlank | "El nombre no puede estar vacío" |
| `apellido` | @NotBlank | "El apellido no puede estar vacío" |
| `email` | @Email + @NotBlank | "El email debe tener un formato válido" |
| `fechaNacimiento` | @NotNull | "La fecha no puede estar vacía" |

### 🛡️ **Protecciones Implementadas**

#### **1. SQL Injection Prevention**
- ✅ **JPA/Hibernate**: Uso de prepared statements automático
- ✅ **Repository Pattern**: Métodos tipados sin SQL raw
- ✅ **Parameterized Queries**: En queries personalizadas

#### **2. XSS Prevention**  
- ✅ **Input Validation**: Validación estricta de tipos
- ✅ **Output Encoding**: JSON serialización automática
- ✅ **Content-Type**: application/json en responses

#### **3. CSRF Protection**
- ✅ **Stateless JWT**: No cookies de sesión
- ✅ **SameSite Headers**: Configuración de CORS específica

---

## 6. CONFIGURACIÓN DE SEGURIDAD

### ⚙️ **SecurityConfig.java - Configuración Principal**

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    // 1. CORS Configuration
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        // Configuración específica por dominio
    }
    
    // 2. Password Encoder  
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    // 3. Security Filter Chain
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) {
        return http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

### 🔧 **Variables de Entorno de Seguridad**

```properties
# JWT Configuration
app.security.jwt.secret=${JWT_SECRET:change-me-secret-change-me-secret-key-minimum-32-chars}
app.security.jwt.expiration-ms=${JWT_EXPIRATION:3600000}

# CORS Configuration  
app.cors.allowed-origins=${CORS_ORIGINS:http://localhost:3000,https://administracion.thomasruizdiaz.com}

# Database (Security Impact)
spring.datasource.url=${DB_URL:jdbc:h2:mem:testdb}
spring.datasource.username=${DB_USER:sa}
spring.datasource.password=${DB_PASSWORD:password}
```

### 🌍 **Configuración por Ambiente**

#### **Development**
```properties
app.security.jwt.expiration-ms=86400000  # 24 horas
app.cors.allowed-origins=http://localhost:3000,http://localhost:3001
logging.level.com.demo.sistema_gestion_escolar.security=DEBUG
```

#### **Production**  
```properties
app.security.jwt.expiration-ms=3600000   # 1 hora
app.cors.allowed-origins=https://administracion.thomasruizdiaz.com
app.security.jwt.secret=${JWT_SECRET}     # Variable de entorno segura
```

---

## 7. MEJORES PRÁCTICAS

### 🛡️ **Implementadas en el Sistema**

#### **✅ Autenticación**
- JWT stateless con expiración
- Contraseñas hasheadas con BCrypt  
- Secret key configurable por environment
- Headers Authorization estándar

#### **✅ Autorización**
- Roles en JWT claims
- Filter chain para validación automática
- SecurityContext management

#### **✅ Comunicación**
- CORS configurado específicamente
- HTTPS recomendado (configurar en proxy/loadbalancer)
- Headers seguros expuestos

#### **✅ Datos**
- Validaciones de entrada estrictas
- Email único constraints
- Passwords nunca en responses
- Prepared statements (JPA)

### 🎯 **Recomendaciones Adicionales**

#### **🔒 Para Producción**

1. **Variables de Entorno Seguras**
   ```bash
   # Nunca en código:
   JWT_SECRET=mi-super-secret-key-de-al-menos-32-caracteres-para-hmac-sha256
   DB_PASSWORD=password-seguro-de-base-de-datos
   ```

2. **Rate Limiting** (Pendiente)
   ```java
   // Implementar con Spring Security
   @RateLimiter(name = "login", fallbackMethod = "fallbackLogin")
   ```

3. **Logging de Seguridad** (Pendiente)
   ```java  
   // Log eventos de seguridad
   log.warn("Failed login attempt for user: {}", email);
   log.info("Successful login for user: {}", email);
   ```

4. **Password Policy** (Pendiente)
   ```java
   // Para administradores
   - Mínimo 8 caracteres
   - Al menos 1 mayúscula, 1 minúscula, 1 número
   - Cambio periódico (90 días)
   ```

---

## 8. CHECKLIST DE SEGURIDAD

### ✅ **Implementado - Estado Actual**

#### **Autenticación y Autorización**
- [x] JWT implementation con HS256
- [x] BCrypt password hashing
- [x] Token expiration (configurable)
- [x] Role-based access control
- [x] Stateless authentication

#### **Validación de Datos**
- [x] Bean validation (@NotBlank, @Email, etc.)
- [x] Unique constraints (email)
- [x] Input type validation
- [x] JPA prepared statements

#### **Configuración de Seguridad**
- [x] CORS configuration específica
- [x] CSRF disabled (stateless JWT)
- [x] Session management stateless
- [x] Security filter chain

#### **Gestión de Contraseñas**
- [x] Automatic password generation
- [x] BCrypt hashing con salt
- [x] Password validation service
- [x] No passwords in API responses
---
## 🚨 **PUNTOS CRÍTICOS DE SEGURIDAD**

### 🔴 **ALTA PRIORIDAD**

1. **JWT Secret Key**
   - ⚠️ Cambiar el secret por defecto en producción
   - ⚠️ Usar variable de entorno segura
   - ⚠️ Mínimo 32 caracteres para HMAC-SHA256

2. **CORS Origins**
   - ⚠️ Especificar dominios exactos en producción
   - ⚠️ No usar wildcards (*) en producción
   - ⚠️ Validar orígenes permitidos

3. **Base de Datos**
   - ⚠️ Configurar credenciales seguras
   - ⚠️ Usar SSL/TLS para conexiones
   - ⚠️ Principle of least privilege
---

## 📞 **CONTACTO Y SOPORTE**

Para consultas de seguridad o reportar vulnerabilidades:

- **Email de Seguridad**: lucasinsabralde07@gmail.com
- **Documentación**: `/docs/seguridad/`
- **Logs de Seguridad**: `/var/log/security/`
- **Configuración**: `/src/main/resources/application.properties`