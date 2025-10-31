diff --git a//dev/null b/API_DOC.md
index 0000000000000000000000000000000000000000..b4e56df1a8e9ad38bc85142497bc3d0e1df41aa2 100644
--- a//dev/null
+++ b/API_DOC.md
@@ -0,0 +1,43 @@
+# API Documentation
+
+La siguiente tabla describe los endpoints principales del sistema de gestión escolar.
+
+| Método | URL | Parámetros | Payload de ejemplo | Respuestas |
+|-------|-----|------------|-------------------|------------|
+| GET | `/api/alumnos` | - | - | `200 OK` |
+| GET | `/api/alumnos/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/alumnos` | - | `{ "nombre": "Juan", "apellido": "Pérez", "email": "juan@example.com" }` | `200 OK` |
+| PUT | `/api/alumnos/{id}` | `id` (path) | `{ "nombre": "Juan", "apellido": "Actualizado", "email": "juan@example.com" }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/alumnos/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/profesores` | - | - | `200 OK` |
+| GET | `/api/profesores/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/profesores` | - | `{ "nombre": "Ana", "apellido": "Gómez", "email": "ana@example.com" }` | `200 OK` |
+| PUT | `/api/profesores/{id}` | `id` (path) | `{ "nombre": "Ana", "apellido": "Actualizado", "email": "ana@example.com" }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/profesores/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/materias` | - | - | `200 OK` |
+| GET | `/api/materias/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/materias` | - | `{ "nombre": "Matemáticas", "profesorId": 1 }` | `200 OK` |
+| PUT | `/api/materias/{id}` | `id` (path) | `{ "nombre": "Matemáticas Avanzadas", "profesorId": 1 }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/materias/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/cursos` | - | - | `200 OK` |
+| GET | `/api/cursos/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/cursos` | - | `{ "nombre": "1A" }` | `200 OK` |
+| PUT | `/api/cursos/{id}` | `id` (path) | `{ "nombre": "1A Actualizado" }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/cursos/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/inscripciones` | - | - | `200 OK` |
+| GET | `/api/inscripciones/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/inscripciones` | - | `{ "fechaInscripcion": "2024-01-01", "estado": "ACTIVO", "alumnoId": 1, "cursoId": 1 }` | `200 OK` |
+| PUT | `/api/inscripciones/{id}` | `id` (path) | `{ "fechaInscripcion": "2024-01-01", "estado": "FINALIZADO", "alumnoId": 1, "cursoId": 1 }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/inscripciones/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/dictados` | - | - | `200 OK` |
+| GET | `/api/dictados/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/dictados` | - | `{ "fechaInicio": "2024-02-01", "fechaFin": "2024-06-30", "cursoId": 1, "materiaId": 1 }` | `200 OK` |
+| PUT | `/api/dictados/{id}` | `id` (path) | `{ "fechaInicio": "2024-02-01", "fechaFin": "2024-07-30", "cursoId": 1, "materiaId": 1 }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/dictados/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+| GET | `/api/administradores` | - | - | `200 OK` |
+| GET | `/api/administradores/{id}` | `id` (path) | - | `200 OK`, `404 Not Found` |
+| POST | `/api/administradores` | - | `{ "usuario": "admin", "contrasena": "1234", "rol": "ADMIN" }` | `200 OK` |
+| PUT | `/api/administradores/{id}` | `id` (path) | `{ "usuario": "admin", "contrasena": "abcd", "rol": "ADMIN" }` | `200 OK`, `404 Not Found` |
+| DELETE | `/api/administradores/{id}` | `id` (path) | - | `204 No Content`, `404 Not Found` |
+
+> Nota: Los códigos de respuesta pueden variar según la implementación específica.
