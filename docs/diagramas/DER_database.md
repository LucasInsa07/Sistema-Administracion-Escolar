# DIAGRAMA ENTIDAD-RELACIÓN (DER) - SISTEMA GESTIÓN ESCOLAR

## ENTIDADES Y ATRIBUTOS

### 1. ALUMNO
- **id** (Long, PK, AUTO_INCREMENT)
- nombre (VARCHAR(50), NOT NULL)
- apellido (VARCHAR(50), NOT NULL)
- email (VARCHAR(100), NOT NULL, UNIQUE)
- fecha_nacimiento (DATE, NOT NULL)
- contrasena (VARCHAR(255), NOT NULL)

### 2. PROFESOR
- **id** (Long, PK, AUTO_INCREMENT)
- nombre (VARCHAR(50), NOT NULL)
- apellido (VARCHAR(50), NOT NULL)
- email (VARCHAR(100), NOT NULL, UNIQUE)

### 3. MATERIA
- **id** (Long, PK, AUTO_INCREMENT)
- nombre (VARCHAR(50), NOT NULL)
- dia_semana (VARCHAR(15))
- hora_inicio (VARCHAR(5))
- hora_fin (VARCHAR(5))
- **profesor_id** (Long, FK → PROFESOR.id, NOT NULL)

### 4. CURSO
- **id** (Long, PK, AUTO_INCREMENT)
- nombre (VARCHAR(50), NOT NULL)
- descripcion (VARCHAR(500))
- anio (INTEGER, NOT NULL)
- division (VARCHAR(1), NOT NULL)
- activo (BOOLEAN, NOT NULL, DEFAULT TRUE)

### 5. DICTADO
- **id** (Long, PK, AUTO_INCREMENT)
- fecha_inicio (DATE, NOT NULL)
- fecha_fin (DATE, NOT NULL)
- activo (BOOLEAN, NOT NULL, DEFAULT TRUE)
- **curso_id** (Long, FK → CURSO.id, NOT NULL)
- **materia_id** (Long, FK → MATERIA.id, NOT NULL)

### 6. INSCRIPCION
- **id** (Long, PK, AUTO_INCREMENT)
- fecha_inscripcion (DATE, NOT NULL)
- estado (ENUM: 'ACTIVO', 'FINALIZADO', 'ANULADO', NOT NULL)
- **alumno_id** (Long, FK → ALUMNO.id, NULLABLE)
- **curso_id** (Long, FK → CURSO.id, NOT NULL)

### 7. ADMINISTRADOR
- **id** (Long, PK, AUTO_INCREMENT)
- usuario (VARCHAR(50), NOT NULL, UNIQUE)
- contrasena (VARCHAR(255), NOT NULL)
- rol (VARCHAR(20), NOT NULL)

## RELACIONES

### RELACIONES ONE-TO-MANY (1:N)
1. **PROFESOR → MATERIA**
   - Un profesor puede dictar múltiples materias
   - Una materia es dictada por un solo profesor
   - FK: materia.profesor_id → profesor.id

2. **CURSO → INSCRIPCION**
   - Un curso puede tener múltiples inscripciones
   - Una inscripción pertenece a un solo curso
   - FK: inscripcion.curso_id → curso.id

3. **CURSO → DICTADO**
   - Un curso puede tener múltiples dictados
   - Un dictado pertenece a un solo curso
   - FK: dictado.curso_id → curso.id

4. **MATERIA → DICTADO**
   - Una materia puede tener múltiples dictados
   - Un dictado corresponde a una sola materia
   - FK: dictado.materia_id → materia.id

### RELACIONES MANY-TO-ONE (N:1)
1. **ALUMNO ← INSCRIPCION**
   - Un alumno puede tener múltiples inscripciones
   - Una inscripción pertenece a un solo alumno
   - FK: inscripcion.alumno_id → alumno.id

## REGLAS DE NEGOCIO Y CONSTRAINTS

### UNIQUE CONSTRAINTS
- alumno.email (único por alumno)
- profesor.email (único por profesor)
- administrador.usuario (único por administrador)

### CASCADAS
- profesor → materia: CASCADE ALL
- curso → inscripcion: CASCADE ALL
- curso → dictado: CASCADE ALL
- materia → dictado: CASCADE ALL

### ENUMS
- inscripcion.estado: {'ACTIVO', 'FINALIZADO', 'ANULADO'}

## DESCRIPCIÓN DEL MODELO

El sistema maneja la gestión escolar con las siguientes entidades principales:

1. **ALUMNOS**: Estudiantes del sistema con datos personales y credenciales
2. **PROFESORES**: Docentes que dictan materias
3. **MATERIAS**: Asignaturas con horarios, dictadas por profesores
4. **CURSOS**: Agrupaciones de estudiantes por año y división
5. **DICTADOS**: Relación entre materias y cursos en períodos específicos
6. **INSCRIPCIONES**: Registro de alumnos en cursos específicos
7. **ADMINISTRADORES**: Usuarios del sistema con permisos administrativos

### FLUJO PRINCIPAL
- Los PROFESORES dictan MATERIAS
- Los CURSOS agrupan estudiantes por año/división
- Los DICTADOS relacionan MATERIAS con CURSOS en períodos específicos
- Los ALUMNOS se inscriben en CURSOS mediante INSCRIPCIONES
- Los ADMINISTRADORES gestionan el sistema

### CARDINALIDADES CLAVE
- 1 PROFESOR : N MATERIAS
- 1 CURSO : N INSCRIPCIONES
- 1 ALUMNO : N INSCRIPCIONES
- 1 CURSO : N DICTADOS
- 1 MATERIA : N DICTADOS

Esta estructura permite gestionar eficientemente la asignación de materias a cursos, la inscripción de alumnos, y el seguimiento de la actividad académica.