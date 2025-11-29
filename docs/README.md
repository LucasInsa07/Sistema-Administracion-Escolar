# Sistema de Administración Escolar AAES

> **Documentación técnica del sistema de gestión académica desarrollado con Spring Boot y Next.js**

##  Índice de Documentación

###  Arquitectura del Sistema
- **[Resumen Arquitectónico](./architecture/README.md)** - Visión general de la arquitectura y decisiones técnicas
- **[Arquitectura de Backend](./architecture/backend-architecture.md)** - Estructura del servidor Spring Boot
- **[Arquitectura de Frontend](./architecture/frontend-architecture.md)** - Estructura del cliente Next.js
- **[Flujo de Datos](./architecture/data-flow.md)** - Cómo circula la información en el sistema

### 🔌 Documentación de API
- **[Guía de APIs](./api/README.md)** - Referencia completa de endpoints REST
- **[Autenticación](./api/authentication.md)** - Sistema de login y tokens JWT
- **[Módulo de Estudiantes](./api/students.md)** - Gestión de alumnos y operaciones masivas
- **[Módulo de Profesores](./api/teachers.md)** - Gestión de docentes
- **[Módulo de Materias](./api/subjects.md)** - Materias y horarios académicos
- **[Módulo de Cursos](./api/courses.md)** - Gestión de cursos y divisiones
- **[Módulo de Inscripciones](./api/enrollments.md)** - Inscripciones y estados
- **[Códigos de Error](./api/error-codes.md)** - Referencia de errores y soluciones

###  Guías para Desarrolladores
- **[Configuración del Entorno](./developer-guides/setup.md)** - Setup inicial del proyecto
- **[Estándares de Código](./developer-guides/coding-standards.md)** - Convenciones y mejores prácticas
- **[Testing](./developer-guides/testing.md)** - Estrategias de pruebas y herramientas
- **[Despliegue](./developer-guides/deployment.md)** - Guías de despliegue y CI/CD
- **[Troubleshooting](./developer-guides/troubleshooting.md)** - Solución de problemas comunes

### 📊 Diagramas y Modelos
- **[Modelo de Datos](./diagrams/data-model.md)** - ERD y relaciones de base de datos
- **[Diagramas de Flujo](./diagrams/flow-diagrams.md)** - Procesos de negocio principales
- **[Arquitectura Visual](./diagrams/architecture-diagrams.md)** - Diagramas de componentes y despliegue

---

##  Inicio Rápido

### Para Desarrolladores
1. **[Configuración inicial](./developer-guides/setup.md#configuración-inicial)**
2. **[Ejecutar en desarrollo](./developer-guides/setup.md#ejecutar-en-desarrollo)**
3. **[Probar APIs](./api/README.md#colección-postman)**

### Para Arquitectos
1. **[Visión de la arquitectura](./architecture/README.md#visión-general)**
2. **[Decisiones técnicas](./architecture/README.md#decisiones-arquitectónicas)**
3. **[Patrones implementados](./architecture/README.md#patrones-y-principios)**

### Para DevOps
1. **[Guía de despliegue](./developer-guides/deployment.md)**
2. **[Configuración de entornos](./developer-guides/deployment.md#entornos)**
3. **[Monitoreo](./developer-guides/deployment.md#monitoreo)**

---

##  Stack Tecnológico

### Backend
- **Framework**: Spring Boot 3.x
- **Lenguaje**: Java 17+
- **Base de Datos**: MySQL/PostgreSQL con soporte H2 para testing
- **Seguridad**: Spring Security + JWT
- **ORM**: JPA/Hibernate
- **Validaciones**: Bean Validation (JSR-303)

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **UI**: TailwindCSS + shadcn/ui
- **Estado**: React Hooks + Context
- **HTTP**: Fetch API con wrapper personalizado

### DevOps y Herramientas
- **Control de Versiones**: Git + GitHub
- **Testing**: JUnit 5, React Testing Library
- **Build**: Maven (backend), pnpm (frontend)
- **CI/CD**: GitHub Actions
- **Documentación**: Markdown + OpenAPI

---

##  Estado del Proyecto

| Módulo | Estado | Cobertura Tests | Documentación |
|--------|--------|----------------|---------------|
| Autenticación | ✅ Completo | 🔄 En progreso | ✅ Completo |
| Estudiantes | ✅ Completo | 🔄 En progreso | ✅ Completo |
| Profesores | ✅ Completo | ❌ Pendiente | ✅ Completo |
| Materias | ✅ Completo | ❌ Pendiente | ✅ Completo |
| Cursos | ✅ Completo | ❌ Pendiente | ✅ Completo |
| Inscripciones | ✅ Completo | ❌ Pendiente | ✅ Completo |
| Reportes | 🔄 En progreso | ❌ Pendiente | 🔄 En progreso |

---

##  Contribuir

Para contribuir al proyecto, revisa:
- **[Estándares de código](./developer-guides/coding-standards.md)**
- **[Proceso de desarrollo](./developer-guides/development-process.md)**
- **[Guía de testing](./developer-guides/testing.md)**

---

##  Contacto y Soporte

- **Desarrollador Principal**: Lucas Insa
- **Repositorio**: [GitHub - Sistema-Administracion-Escolar](https://github.com/LucasInsa07/Sistema-Administracion-Escolar)
- **Documentación Legacy**: [Ver archivos legacy](./legacy/)

---

*Esta documentación se actualiza automáticamente con cada release. Última actualización: 31/10/2025*
