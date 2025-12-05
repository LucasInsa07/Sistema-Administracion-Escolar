# Sistema de Administración Escolar AAES

> **Documentación técnica del sistema de gestión académica desarrollado con Spring Boot y Next.js**

##  Índice de Documentación

### 🏗️ Arquitectura del Sistema
- **[Resumen Arquitectónico](./arquitectura/README.md)** - Visión general de la arquitectura y decisiones técnicas
- **[Flujo de Procesos](./diagramas/FLUJO_DE_PROCESOS.md)** - Procesos de negocio del sistema
- **[Diagrama de Base de Datos](./diagramas/DER_database.md)** - Modelo de datos y relaciones

###  Documentación de API
- **[Guía de APIs](./api/README.md)** - Referencia completa de endpoints REST
- **[Seguridad](./seguridad/README.md)** - Sistema de autenticación y autorización

### 👩‍💻 Guías para Desarrolladores
- **[Configuración del Entorno](./guia-desarrollador/setup.md)** - Setup inicial del proyecto
- **[Estándares de Código](./guia-desarrollador/estandar-del-codigo.md)** - Convenciones y mejores prácticas
- **[Optimización de Performance](./guia-desarrollador/performance-optimization.md)** - Mejoras de rendimiento implementadas

### 📊 Diagramas y Modelos
- **[Modelo de Datos](./diagramas/DER_database.md)** - ERD y relaciones de base de datos
- **[Flujo de Procesos](./diagramas/FLUJO_DE_PROCESOS.md)** - Procesos de negocio principales

---

##  Inicio Rápido

### Para Desarrolladores
1. **[Configuración inicial](./guia-desarrollador/setup.md)**
2. **[Estándares de código](./guia-desarrollador/estandar-del-codigo.md)**
3. **[Probar APIs](./api/README.md)**

### Para Arquitectos
1. **[Visión de la arquitectura](./arquitectura/README.md)**
2. **[Modelo de datos](./diagramas/DER_database.md)**
3. **[Flujo de procesos](./diagramas/FLUJO_DE_PROCESOS.md)**

### Para DevOps
1. **[Configuración del entorno](./guia-desarrollador/setup.md)**
2. **[Optimización de performance](./guia-desarrollador/performance-optimization.md)**
3. **[Seguridad](./seguridad/README.md)**

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


##  Contribuir

Para contribuir al proyecto, revisa:
- **[Estándares de código](./guia-desarrollador/estandar-del-codigo.md)**
- **[Configuración del entorno](./guia-desarrollador/setup.md)**
- **[Guía de testing](./developer-guides/testing.md)**

---

##  Contacto y Soporte

- **Desarrollador Principal**: Lucas Insabralde
  **Desarrollador Secundario**: Thomas Ruiz Diaz
  **DevOps** : Nicolás Moscova Dimiro
  **Arquitecto** : Manuel Margulis
- **Repositorio**: [GitHub - Sistema-Administracion-Escolar](https://github.com/LucasInsa07/Sistema-Administracion-Escolar)
- **Documentación Legacy**: [Ver archivos legacy](./legacy/)

---

*Esta documentación se actualiza automáticamente con cada release. Última actualización: 31/10/2025*
