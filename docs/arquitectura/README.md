# Arquitectura del Sistema AAES

## Visión General

El Sistema de Administración Escolar AAES está diseñado siguiendo una **arquitectura cliente-servidor** con separación clara de responsabilidades, implementando patrones modernos de desarrollo y principios de arquitectura limpia.

## Principios Arquitectónicos

### 1. Separación de Responsabilidades
- **Frontend (Cliente)**: Interfaz de usuario, validaciones del lado cliente, gestión de estado local
- **Backend (Servidor)**: Lógica de negocio, validaciones autoritativas, persistencia de datos
- **Base de Datos**: Almacenamiento persistente con integridad referencial

### 2. Arquitectura por Capas (Backend)
```
┌─────────────────────┐
│   Presentation      │ ← Controllers REST
├─────────────────────┤
│   Business Logic    │ ← Services + DTOs
├─────────────────────┤
│   Data Access       │ ← Repositories + JPA
├─────────────────────┤
│   Data Storage      │ ← Base de Datos
└─────────────────────┘
```

### 3. Modularidad por Dominio
Cada entidad del negocio tiene su propio conjunto de componentes:
- **Modelo de Dominio**: `Alumno`, `Profesor`, `Materia`, `Curso`, `Inscripcion`, `Dictado`
- **Patrón por Entidad**: Controller → Service → Repository → Entity

## Decisiones Arquitectónicas

### Backend: Spring Boot

**¿Por qué Spring Boot?**
- Ecosistema maduro y probado en producción
- Inversión de control y dependency injection nativo
- Excelente integración con JPA/Hibernate
- Seguridad robusta con Spring Security
- Facilidad para crear APIs REST

**Estructura de Capas:**

1. **Controllers** (`@RestController`)
   - Puntos de entrada HTTP
   - Validación de entrada con `@Valid`
   - Transformación DTO ↔ Entity
   - Manejo de respuestas HTTP

2. **Services** (`@Service`)
   - Lógica de negocio pura
   - Validaciones de reglas de negocio
   - Coordinación entre repositories
   - Transacciones (`@Transactional`)

3. **Repositories** (`@Repository`)
   - Acceso a datos exclusivamente
   - Queries personalizadas con `@Query`
   - Extienden `JpaRepository<T, ID>`

4. **Entities** (`@Entity`)
   - Mapeo JPA a tablas
   - Relaciones entre entidades
   - Validaciones de base de datos

### Frontend: Next.js + TypeScript

**¿Por qué Next.js?**
- Server-side rendering (SSR) + static generation
- Routing automático basado en archivos
- Optimizaciones automáticas (images, fonts, etc.)
- Excelente experiencia de desarrollo
- TypeScript nativo

**Estructura de Componentes:**

1. **Pages** (App Router)
   - Rutas principales del sistema
   - Server components cuando es posible
   - Client components solo cuando necesario

2. **Components**
   - Reutilización y composición
   - Separación por módulo funcional
   - Props tipadas con TypeScript

3. **API Layer**
   - Cliente HTTP centralizado
   - Manejo de autenticación automática
   - Type-safe con TypeScript

## Flujo de Datos Típico

### Operación de Lectura (GET)
```
[Frontend] 
    ↓ HTTP GET /api/v1/alumnos
[Controller] 
    ↓ service.obtenerTodos()
[Service] 
    ↓ repository.findAll()
[Repository] 
    ↓ JPA Query
[Database] 
    ↑ ResultSet
[Repository] 
    ↑ List<Alumno>
[Service] 
    ↑ List<AlumnoResponseDTO>
[Controller] 
    ↑ HTTP 200 + JSON
[Frontend]
```

### Operación de Escritura (POST)
```
[Frontend] 
    ↓ HTTP POST + AlumnoRequestDTO
[Controller] 
    ↓ @Valid validation
    ↓ service.crear(dto)
[Service] 
    ↓ Business validation
    ↓ dto → entity conversion
    ↓ repository.save(entity)
[Repository] 
    ↓ INSERT SQL
[Database]
    ↑ Generated ID
[Repository] 
    ↑ Saved entity
[Service] 
    ↑ entity → responseDTO
[Controller] 
    ↑ HTTP 201 + JSON
[Frontend]
```

## Patrones Implementados

### 1. DTO (Data Transfer Object)
**Propósito**: Desacoplar la API de los modelos internos
- **Request DTOs**: Datos de entrada con validaciones
- **Response DTOs**: Datos de salida optimizados para el frontend
- **Beneficios**: Versionado de API, seguridad, optimización

### 2. Repository Pattern
**Propósito**: Abstracción del acceso a datos
- Interfaces que extienden `JpaRepository`
- Queries personalizadas cuando es necesario
- Facilita testing con mocks

### 3. Service Layer Pattern
**Propósito**: Encapsular lógica de negocio
- Transacciones controladas
- Validaciones de reglas de negocio
- Coordinación entre múltiples repositories

### 4. MVC (Model-View-Controller)
**Propósito**: Separación de responsabilidades
- **Model**: Entities + DTOs
- **View**: Frontend React components
- **Controller**: REST controllers

## Seguridad

### Autenticación y Autorización
- **JWT Tokens**: Stateless authentication
- **Spring Security**: Configuración de endpoints protegidos
- **Role-based Access**: ADMIN, USER roles
- **Password Hashing**: BCrypt para almacenamiento seguro

### Validaciones Multicapa
1. **Frontend**: Validación UX inmediata
2. **Backend DTO**: Validación de formato y constraints
3. **Service Layer**: Validación de reglas de negocio
4. **Database**: Constraints de integridad referencial

## Escalabilidad y Performance

### Backend
- **Connection Pooling**: HikariCP configurado
- **Lazy Loading**: JPA lazy loading en relaciones
- **Query Optimization**: Indices en foreign keys
- **Stateless Design**: Horizontal scaling friendly

### Frontend
- **Code Splitting**: Automático con Next.js
- **Image Optimization**: next/image component
- **Static Generation**: Para páginas que no cambian frecuentemente
- **Client-side Caching**: React Query potencial

## Monitoreo y Observabilidad

### Logs
- **Structured Logging**: JSON format para parsing automático
- **Log Levels**: ERROR, WARN, INFO, DEBUG apropiados
- **Context**: Request IDs para trazabilidad

### Metrics (Planeado)
- **Spring Actuator**: Health checks y metrics
- **Custom Metrics**: Business metrics importantes
- **Performance Monitoring**: Response times y throughput

---

## Evolución Arquitectónica

### Siguiente Fase: Microservicios (Opcional)
Cuando el sistema crezca significativamente, se puede considerar:
- Separar dominios en servicios independientes
- Event-driven architecture
- API Gateway
- Service discovery

### Mejoras Inmediatas Planificadas
1. **Caching Layer**: Redis para datos frecuentes
2. **Event System**: Para notificaciones y auditoría
3. **File Storage**: Para documentos y avatares
4. **Reporting Engine**: Para generación de reportes complejos

---

*Documento de arquitectura vivo - actualizado el 31/10/2025*