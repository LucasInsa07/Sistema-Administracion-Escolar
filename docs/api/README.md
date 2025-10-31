# API Reference - Sistema AAES

## Información General

**Base URL**: `http://localhost:8080/api/v1`  
**Autenticación**: Bearer Token (JWT)  
**Content-Type**: `application/json`  
**Versión**: v1.0

## Autenticación

Todas las rutas (excepto `/auth/login`) requieren un token JWT válido en el header:

```http
Authorization: Bearer <tu_jwt_token>
```

### Obtener Token

```http
POST /auth/login
Content-Type: application/json

{
  "usuario": "admin",
  "contrasena": "admin123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tipo": "Bearer",
  "expiracion": "2025-11-01T10:00:00Z"
}
```

---

## Endpoints por Módulo

### 🎓 Estudiantes (`/alumnos`)

#### Listar Estudiantes
```http
GET /alumnos
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Juan Carlos",
    "apellido": "Pérez",
    "email": "juan.perez@estudiante.edu.ar",
    "fechaNacimiento": "2005-03-15",
    "fechaCreacion": "2025-10-31T08:00:00Z"
  }
]
```

#### Obtener Estudiante por ID
```http
GET /alumnos/{id}
```

#### Crear Estudiante
```http
POST /alumnos
Content-Type: application/json

{
  "nombre": "María Elena",
  "apellido": "González", 
  "email": "maria.gonzalez@estudiante.edu.ar",
  "fechaNacimiento": "2006-07-22"
}
```

#### Crear Estudiantes en Lote
```http
POST /alumnos/lote
Content-Type: application/json

{
  "alumnos": [
    {
      "nombre": "Pedro",
      "apellido": "Martinez",
      "email": "pedro.martinez@estudiante.edu.ar",
      "fechaNacimiento": "2005-01-10"
    },
    {
      "nombre": "Ana",
      "apellido": "Rodriguez", 
      "email": "ana.rodriguez@estudiante.edu.ar",
      "fechaNacimiento": "2005-09-05"
    }
  ]
}
```

**Respuesta de Lote:**
```json
{
  "totalProcesados": 2,
  "totalExitosos": 2,
  "totalErrores": 0,
  "detalles": [
    {
      "indice": 0,
      "exitoso": true,
      "alumnoId": 15,
      "mensaje": "Alumno creado exitosamente"
    },
    {
      "indice": 1, 
      "exitoso": true,
      "alumnoId": 16,
      "mensaje": "Alumno creado exitosamente"
    }
  ]
}
```

#### Actualizar Estudiante
```http
PUT /alumnos/{id}
Content-Type: application/json

{
  "nombre": "Juan Carlos",
  "apellido": "Pérez Actualizado",
  "email": "juan.perez.nuevo@estudiante.edu.ar",
  "fechaNacimiento": "2005-03-15"
}
```

#### Eliminar Estudiante
```http
DELETE /alumnos/{id}
```
*Requiere rol ADMIN*

#### Migrar Contraseñas (Operación Admin)
```http
POST /alumnos/admin/migrar-contrasenas
```
*Requiere rol ADMIN - Genera contraseñas automáticas para todos los alumnos*

---

### 👨‍🏫 Profesores (`/profesores`)

#### Listar Profesores
```http
GET /profesores
```

#### Crear Profesor
```http
POST /profesores
Content-Type: application/json

{
  "nombre": "Roberto",
  "apellido": "García",
  "email": "roberto.garcia@colegio.edu.ar"
}
```

#### Actualizar Profesor
```http
PUT /profesores/{id}
Content-Type: application/json

{
  "nombre": "Roberto Carlos",
  "apellido": "García",
  "email": "roberto.garcia@colegio.edu.ar"
}
```

---

### 📚 Materias (`/materias`)

#### Listar Materias
```http
GET /materias
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Matemática",
    "profesorId": 2,
    "profesorNombre": "Roberto",
    "profesorApellido": "García",
    "diaSemana": "Lunes",
    "horaInicio": "09:00",
    "horaFin": "10:30"
  }
]
```

#### Crear Materia con Horario
```http
POST /materias
Content-Type: application/json

{
  "nombre": "Física Avanzada",
  "profesorId": 3,
  "diaSemana": "Martes", 
  "horaInicio": "14:00",
  "horaFin": "15:30"
}
```

**Validaciones:**
- `diaSemana`: Opcional, texto libre
- `horaInicio/horaFin`: Formato HH:mm, horaFin debe ser posterior a horaInicio
- `profesorId`: Debe existir en la base de datos

---

### 🏫 Cursos (`/cursos`)

#### Listar Cursos
```http
GET /cursos
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "nombre": "Primer Año A",
    "descripcion": "Primer año de educación secundaria - División A", 
    "anio": 1,
    "division": "A",
    "activo": true,
    "fechaCreacion": "2025-03-01T08:00:00Z"
  }
]
```

#### Crear Curso
```http
POST /cursos
Content-Type: application/json

{
  "nombre": "Segundo Año B",
  "descripcion": "Segundo año de educación secundaria - División B",
  "anio": 2,
  "division": "B", 
  "activo": true
}
```

---

### 📝 Inscripciones (`/inscripciones`)

#### Listar Inscripciones
```http
GET /inscripciones
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "fechaInscripcion": "2025-03-01",
    "estado": "ACTIVO",
    "alumnoId": 1,
    "alumnoNombre": "Juan Carlos", 
    "alumnoApellido": "Pérez",
    "alumnoEmail": "juan.perez@estudiante.edu.ar",
    "cursoId": 1,
    "cursoNombre": "Primer Año A",
    "cursoDescripcion": "Primer año de educación secundaria - División A",
    "cursoAnio": 1,
    "cursoDivision": "A",
    "cursoActivo": true
  }
]
```

#### Crear Inscripción
```http
POST /inscripciones
Content-Type: application/json

{
  "alumnoId": 5,
  "cursoId": 2,
  "estado": "ACTIVO",
  "fechaInscripcion": "2025-10-31"
}
```

**Estados válidos**: `ACTIVO`, `FINALIZADO`, `ANULADO`

#### Inscripciones en Lote
```http
POST /inscripciones/lote
Content-Type: application/json

{
  "inscripciones": [
    {
      "alumnoId": 1,
      "cursoId": 2,
      "estado": "ACTIVO",
      "fechaInscripcion": "2025-10-31"
    },
    {
      "alumnoId": 2, 
      "cursoId": 2,
      "estado": "ACTIVO",
      "fechaInscripcion": "2025-10-31"
    }
  ]
}
```

---

### 📖 Dictados (`/dictados`)

Los dictados representan la asignación de una materia a un curso específico en un período determinado.

#### Listar Dictados
```http
GET /dictados
```

**Respuesta:**
```json
[
  {
    "id": 1,
    "fechaInicio": "2025-03-01T08:00:00Z",
    "fechaFin": "2025-12-15T18:00:00Z", 
    "activo": true,
    "cursoId": 1,
    "cursoNombre": "Primer Año A",
    "cursoDescripcion": "Primer año de educación secundaria - División A",
    "cursoAnio": 1,
    "cursoDivision": "A",
    "materiaId": 1,
    "materiaNombre": "Matemática",
    "materiaProfesorId": 2,
    "materiaProfesorNombre": "Roberto",
    "materiaProfesorApellido": "García"
  }
]
```

#### Crear Dictado
```http
POST /dictados
Content-Type: application/json

{
  "fechaInicio": "2025-03-01T08:00:00Z",
  "fechaFin": "2025-12-15T18:00:00Z",
  "activo": true,
  "cursoId": 1,
  "materiaId": 1
}
```

---

## Códigos de Respuesta HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| `200` | OK | Operación exitosa (GET, PUT) |
| `201` | Created | Recurso creado exitosamente (POST) |
| `204` | No Content | Eliminación exitosa (DELETE) |
| `400` | Bad Request | Error de validación en request |
| `401` | Unauthorized | Token inválido o faltante |
| `403` | Forbidden | Usuario sin permisos para la operación |
| `404` | Not Found | Recurso no encontrado |
| `409` | Conflict | Conflicto de datos (ej: email duplicado) |
| `500` | Internal Server Error | Error interno del servidor |

## Ejemplos de Errores

### Error de Validación (400)
```json
{
  "timestamp": "2025-10-31T10:15:30Z",
  "status": 400,
  "error": "Bad Request", 
  "message": "Error de validación",
  "errors": {
    "nombre": "El nombre es obligatorio",
    "email": "Debe ser un email válido"
  },
  "path": "/api/v1/alumnos"
}
```

### Error de Autorización (401)
```json
{
  "timestamp": "2025-10-31T10:15:30Z",
  "status": 401,
  "error": "Unauthorized",
  "message": "Token JWT inválido o expirado",
  "path": "/api/v1/alumnos"
}
```

### Recurso No Encontrado (404)
```json
{
  "timestamp": "2025-10-31T10:15:30Z", 
  "status": 404,
  "error": "Not Found",
  "message": "Alumno con ID 999 no encontrado",
  "path": "/api/v1/alumnos/999"
}
```

---

## Testing de la API

### Usando cURL

**Login:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","contrasena":"admin123"}'
```

**Usar el token:**
```bash
curl -X GET http://localhost:8080/api/v1/alumnos \
  -H "Authorization: Bearer tu_token_aqui"
```
*Documentación de API actualizada el 31/10/2025*