# Guía de Configuración del Entorno de Desarrollo

## Requisitos del Sistema

### Software Requerido

| Herramienta | Versión Mínima | Versión Recomendada | Propósito |
|-------------|----------------|---------------------|-----------|
| **Java JDK** | 17 | 21 LTS | Runtime del backend |
| **Node.js** | 18.0 | 20.x LTS | Runtime del frontend |
| **Maven** | 3.8 | 3.9+ | Build del backend |
| **pnpm** | 8.0 | 9.x | Gestión de dependencias frontend |
| **Git** | 2.30 | Latest | Control de versiones |
| **VS Code** | 1.80 | Latest | Editor recomendado |

### Base de Datos

Para **desarrollo local**:
- H2 Database (incluida en el proyecto, sin configuración adicional)

Para **producción**:
- MySQL 8.0+ ó PostgreSQL 13+

---

## Configuración Inicial

### 1. Clonar el Repositorio

```bash
git clone https://github.com/LucasInsa07/Sistema-Administracion-Escolar.git
cd Sistema-Administracion-Escolar
```

### 2. Configurar Backend (Spring Boot)

#### Verificar Java
```bash
java -version
# Debe mostrar Java 17 o superior
```

#### Configurar Base de Datos
El proyecto está configurado para usar H2 en desarrollo. Para cambiar a MySQL/PostgreSQL:

**Para MySQL:**
```properties
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/sistema_escolar
spring.datasource.username=tu_usuario
spring.datasource.password=tu_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

**Para PostgreSQL:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/sistema_escolar
spring.datasource.username=tu_usuario  
spring.datasource.password=tu_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

#### Primera Compilación
```bash
# Desde la raíz del proyecto
./mvnw clean compile
# En Windows: mvnw.cmd clean compile
```

### 3. Configurar Frontend (Next.js)

#### Verificar Node.js
```bash
node --version
# Debe mostrar v18.0 o superior
```

#### Instalar pnpm (si no está instalado)
```bash
npm install -g pnpm
```

#### Instalar Dependencias
```bash
cd frontend
pnpm install
```

#### Configuración de Environment
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_APP_NAME=Sistema AAES
```

---

## Ejecutar en Desarrollo

### Backend (Puerto 8080)

```bash
# Desde la raíz del proyecto
./mvnw spring-boot:run

# O usando Maven instalado globalmente
mvn spring-boot:run
```

**Verificar que funciona:**
```bash
curl http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","contrasena":"admin123"}'
```

### Frontend (Puerto 3000)

```bash
# Desde la carpeta frontend/
cd frontend
pnpm dev
```

**Abrir en navegador:** http://localhost:3000

### Ejecutar Ambos Simultáneamente

Para Windows (PowerShell):
```powershell
# Terminal 1: Backend
./mvnw spring-boot:run

# Terminal 2: Frontend
cd frontend; pnpm dev
```

Para macOS/Linux:
```bash
# Usar tmux o screen para múltiples terminales
# O ejecutar en background:
./mvnw spring-boot:run &
cd frontend && pnpm dev
```

---

## Extensiones de VS Code Recomendadas

### Para Java/Spring Boot
```json
{
  "recommendations": [
    "vscjava.vscode-java-pack",
    "vmware.vscode-spring-boot", 
    "redhat.vscode-xml",
    "vscjava.vscode-maven"
  ]
}
```

### Para TypeScript/React
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "ms-playwright.playwright",
    "humao.rest-client"
  ]
}
```

### Configuración de Workspace (.vscode/settings.json)
```json
{
  "java.configuration.updateBuildConfiguration": "automatic",
  "java.saveActions.organizeImports": true,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Scripts de Desarrollo Útiles

### Backend

```bash
# Compilar sin ejecutar tests
./mvnw clean compile -DskipTests

# Ejecutar solo tests
./mvnw test

# Generar JAR para producción
./mvnw clean package -DskipTests

# Ver dependencias
./mvnw dependency:tree

# Limpiar target/ completamente
./mvnw clean
```

### Frontend

```bash
# Modo desarrollo con hot-reload
pnpm dev

# Build para producción
pnpm build

# Servir build de producción localmente
pnpm start

# Linting
pnpm lint

# Type-checking sin build
pnpm type-check

# Limpiar cache de Next.js
pnpm clean
```

---

## Base de Datos de Desarrollo

### H2 (Configuración por defecto)

**URL de consola H2:** http://localhost:8080/h2-console

**Configuración de conexión:**
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuario: `sa`
- Contraseña: (vacía)

### Datos de Prueba

El sistema incluye datos de prueba que se cargan automáticamente:

**Usuario Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

**Estudiantes de Prueba:**
- Los alumnos tienen contraseñas generadas automáticamente
- Formato: `AL + DD + MM + YY` (basado en fecha de nacimiento)

### Migración de Esquema

```bash
# Aplicar migraciones manualmente (si usas MySQL/PostgreSQL)
mysql -u usuario -p sistema_escolar < docs/legacy/sql/schema.sql
```

---

## Troubleshooting Común

### Error: "Puerto 8080 ya en uso"

```bash
# Ver qué proceso usa el puerto
netstat -an | findstr 8080  # Windows
lsof -i :8080              # macOS/Linux

# Cambiar puerto del backend
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### Error: "Cannot resolve dependency"

```bash
# Backend - limpiar cache de Maven
./mvnw dependency:purge-local-repository

# Frontend - limpiar cache de pnpm
pnpm store prune
rm -rf node_modules
pnpm install
```

### Error: "Database connection failed"

1. Verificar que la base de datos esté corriendo
2. Comprobar credenciales en `application.properties`
3. Para desarrollo, usar H2 (configuración por defecto)

### Error: "Frontend no puede conectar a backend"

1. Verificar que el backend esté corriendo en puerto 8080
2. Revisar `NEXT_PUBLIC_API_URL` en `.env.local`
3. Comprobar CORS si usas dominio diferente

---

## Comandos de Reset Completo

Si necesitas empezar desde cero:

```bash
# Backend
./mvnw clean
rm -rf target/

# Frontend  
cd frontend
rm -rf .next/
rm -rf node_modules/
pnpm install

# Git (restaurar a último commit)
git reset --hard HEAD
git clean -fd
```

---

## Siguientes Pasos

Una vez que tengas el entorno funcionando:

1. **[Revisar estándares de código](./coding-standards.md)**
2. **[Ejecutar tests](./testing.md)**
3. **[Probar APIs](../api/README.md)**
4. **[Contribuir al proyecto](./development-process.md)**

---

*Guía de setup actualizada el 31/10/2025*