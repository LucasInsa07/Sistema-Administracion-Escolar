# DIAGRAMAS DE FLUJO - SISTEMA GESTIÓN ESCOLAR

## 📋 ÍNDICE DE FLUJOS

1. [Flujo de Autenticación](#1-flujo-de-autenticación)
2. [Creación de Alumno Individual](#2-creación-de-alumno-individual)
3. [Creación de Alumnos en Lote (Batch)](#3-creación-de-alumnos-en-lote-batch)
4. [Proceso de Inscripción Individual](#4-proceso-de-inscripción-individual)
5. [Inscripciones en Lote (Batch)](#5-inscripciones-en-lote-batch)
6. [Creación de Dictado](#6-creación-de-dictado)
7. [Gestión de Estados de Inscripción](#7-gestión-de-estados-de-inscripción)

---

## 1. FLUJO DE AUTENTICACIÓN

### 🔐 **Proceso JWT Authentication**

```
INICIO
  ↓
¿Usuario ya autenticado?
  ├── SÍ → Continuar con token válido
  └── NO → Proceso de login
      ↓
  Ingresar credenciales
  (email/usuario + password)
      ↓
  Validar en base de datos
      ↓
  ¿Credenciales válidas?
      ├── NO → Error 401 → FIN
      └── SÍ ↓
  Generar JWT Token
      ↓
  Retornar token al cliente
      ↓
  Cliente almacena token
      ↓
  Requests posteriores incluyen token
      ↓
  ¿Token válido y no expirado?
      ├── NO → Error 401 → Renovar token
      └── SÍ → Acceso autorizado
          ↓
        FIN
```

### 🎯 **Puntos clave:**
- Tokens JWT con expiración configurada
- Validación automática en cada request
- Renovación de token cuando expira

---

## 2. CREACIÓN DE ALUMNO INDIVIDUAL

### 👨‍🎓 **Proceso de registro de alumno**

```
INICIO
  ↓
Recibir datos del alumno
(nombre, apellido, email, fechaNacimiento)
  ↓
Validar datos de entrada
  ↓
¿Datos válidos?
  ├── NO → Error 400 (Bad Request) → FIN
  └── SÍ ↓
¿Email ya existe?
  ├── SÍ → Error 409 (Conflict) → FIN
  └── NO ↓
Generar contraseña automática
(Formato: AL + DD + MM + YY)
  ↓
Ejemplo: 15/03/2005 → AL150305
  ↓
Hashear contraseña con BCrypt
  ↓
Crear objeto Alumno
  ↓
Guardar en base de datos
  ↓
¿Guardado exitoso?
  ├── NO → Error 500 → FIN
  └── SÍ ↓
Retornar AlumnoResponseDTO
(SIN incluir contraseña)
  ↓
FIN
```

### 🎯 **Puntos clave:**
- Contraseña generada automáticamente basada en fecha de nacimiento
- Email debe ser único en el sistema
- Contraseña hasheada con BCrypt para seguridad

---

## 3. CREACIÓN DE ALUMNOS EN LOTE (BATCH)

### 👥 **Proceso batch para múltiples alumnos**

```
INICIO
  ↓
Recibir AlumnosBatchRequestDTO
(Lista de alumnos a crear)
  ↓
Inicializar listas:
- alumnosExitosos = []
- errores = []
  ↓
PARA CADA alumno en la lista:
  ↓
  Validar datos del alumno
    ↓
  ¿Datos válidos?
    ├── NO → Agregar a errores → SIGUIENTE
    └── SÍ ↓
  ¿Email ya existe?
    ├── SÍ → Agregar a errores → SIGUIENTE
    └── NO ↓
  Generar contraseña automática
    ↓
  Hashear contraseña
    ↓
  INTENTAR crear alumno:
    ↓
  ¿Creación exitosa?
    ├── NO → Agregar a errores → SIGUIENTE
    └── SÍ → Agregar a alumnosExitosos → SIGUIENTE
      ↓
FIN DEL BUCLE
  ↓
Crear AlumnosBatchResponseDTO
- Total exitosos: alumnosExitosos.size()
- Total errores: errores.size()
- Lista de errores detallados
  ↓
Retornar respuesta completa
  ↓
FIN
```

### 🎯 **Puntos clave:**
- Proceso resiliente: si un alumno falla, continúa con el resto
- Respuesta detallada con éxitos y errores
- Transacciones individuales por alumno

---

## 4. PROCESO DE INSCRIPCIÓN INDIVIDUAL

### 📝 **Registro de alumno en curso**

```
INICIO
  ↓
Recibir InscripcionRequestDTO
(alumnoId, cursoId, fechaInscripcion, estado)
  ↓
Validar datos de entrada
  ↓
¿Datos válidos?
  ├── NO → Error 400 → FIN
  └── SÍ ↓
Buscar Alumno por ID
  ↓
¿Alumno existe?
  ├── NO → Error 404 (Alumno no encontrado) → FIN
  └── SÍ ↓
Buscar Curso por ID
  ↓
¿Curso existe?
  ├── NO → Error 404 (Curso no encontrado) → FIN
  └── SÍ ↓
¿Curso está activo?
  ├── NO → Error 400 (Curso inactivo) → FIN
  └── SÍ ↓
¿Alumno ya inscripto en este curso?
  ├── SÍ → Error 409 (Ya inscripto) → FIN
  └── NO ↓
Crear nueva Inscripción
- Asignar alumno y curso
- Establecer fecha de inscripción
- Establecer estado (ACTIVO por defecto)
  ↓
Guardar inscripción en BD
  ↓
¿Guardado exitoso?
  ├── NO → Error 500 → FIN
  └── SÍ ↓
Retornar InscripcionResponseDTO
  ↓
FIN
```

### 🎯 **Puntos clave:**
- Validación de existencia de alumno y curso
- Verificación de que el curso esté activo
- Control de inscripciones duplicadas

---

## 5. INSCRIPCIONES EN LOTE (BATCH)

### 📋 **Inscripción masiva de alumnos**

```
INICIO
  ↓
Recibir InscripcionesBatchRequestDTO
(cursoId, [alumnosIds], fechaInscripcion, estado)
  ↓
Validar datos generales
  ↓
Buscar Curso por cursoId
  ↓
¿Curso existe?
  ├── NO → Error 404 → FIN
  └── SÍ ↓
¿Curso está activo?
  ├── NO → Error 400 → FIN
  └── SÍ ↓
Inicializar listas:
- inscripcionesExitosas = []
- errores = []
  ↓
PARA CADA alumnoId en alumnosIds:
  ↓
  Buscar Alumno por ID
    ↓
  ¿Alumno existe?
    ├── NO → Agregar a errores → SIGUIENTE
    └── SÍ ↓
  ¿Ya está inscripto en este curso?
    ├── SÍ → Agregar a errores → SIGUIENTE
    └── NO ↓
  INTENTAR crear inscripción:
    ↓
  ¿Creación exitosa?
    ├── NO → Agregar a errores → SIGUIENTE
    └── SÍ → Agregar a inscripcionesExitosas → SIGUIENTE
      ↓
FIN DEL BUCLE
  ↓
Crear InscripcionesBatchResponseDTO
- Inscripciones exitosas
- Lista de errores detallados
- Información del curso
  ↓
Retornar respuesta completa
  ↓
FIN
```

### 🎯 **Puntos clave:**
- Validación previa del curso para toda la operación
- Manejo individual de errores por alumno
- Respuesta detallada con información del curso

---

## 6. CREACIÓN DE DICTADO

### 📚 **Asignación de materia a curso**

```
INICIO
  ↓
Recibir DictadoRequestDTO
(cursoId, materiaId, fechaInicio, fechaFin)
  ↓
Validar datos de entrada
  ↓
¿Datos válidos?
  ├── NO → Error 400 → FIN
  └── SÍ ↓
¿fechaInicio < fechaFin?
  ├── NO → Error 400 (Fechas inválidas) → FIN
  └── SÍ ↓
Buscar Curso por ID
  ↓
¿Curso existe?
  ├── NO → Error 404 (Curso no encontrado) → FIN
  └── SÍ ↓
¿Curso está activo?
  ├── NO → Error 400 (Curso inactivo) → FIN
  └── SÍ ↓
Buscar Materia por ID
  ↓
¿Materia existe?
  ├── NO → Error 404 (Materia no encontrada) → FIN
  └── SÍ ↓
¿Conflicto de horarios?
(Validar con otros dictados del curso)
  ├── SÍ → Error 409 (Conflicto horario) → FIN
  └── NO ↓
¿Profesor disponible en esas fechas?
  ├── NO → Error 409 (Profesor ocupado) → FIN
  └── SÍ ↓
Crear nuevo Dictado
- Asignar curso y materia
- Establecer fechas
- Estado activo = true
  ↓
Guardar dictado en BD
  ↓
¿Guardado exitoso?
  ├── NO → Error 500 → FIN
  └── SÍ ↓
Retornar DictadoResponseDTO
  ↓
FIN
```

### 🎯 **Puntos clave:**
- Validación de fechas lógicas
- Control de conflictos de horarios
- Verificación de disponibilidad del profesor

---

## 7. GESTIÓN DE ESTADOS DE INSCRIPCIÓN

### 🔄 **Ciclo de vida de inscripciones**

```
ESTADO INICIAL: ACTIVO
  ↓
Durante el período escolar:
  ↓
¿Alumno completa el curso?
  ├── SÍ → Cambiar a FINALIZADO
  └── NO ↓
¿Alumno abandona/se retira?
  ├── SÍ → Cambiar a ANULADO
  └── NO → Mantener ACTIVO
      ↓
ESTADOS FINALES:
- FINALIZADO (completó el curso)
- ANULADO (abandonó/retirado)
- ACTIVO (continúa cursando)

TRANSICIONES PERMITIDAS:
ACTIVO → FINALIZADO ✓
ACTIVO → ANULADO ✓
FINALIZADO → ANULADO ✗ (no permitido)
ANULADO → ACTIVO ✗ (requiere nueva inscripción)
```

### 🎯 **Puntos clave:**
- Estados mutuamente excluyentes
- Transiciones controladas por reglas de negocio
- Estado ACTIVO es el inicial por defecto

---

## 🔍 **CONSIDERACIONES TÉCNICAS**

### **Validaciones Comunes:**
- ✅ Datos de entrada (formato, requeridos)
- ✅ Existencia de entidades relacionadas
- ✅ Reglas de negocio específicas
- ✅ Constraints de base de datos

### **Manejo de Errores:**
- 🚫 400 - Bad Request (datos inválidos)
- 🚫 401 - Unauthorized (no autenticado)
- 🚫 404 - Not Found (entidad no existe)
- 🚫 409 - Conflict (violación de reglas)
- 🚫 500 - Internal Server Error (error del sistema)

### **Operaciones Batch:**
- 🔄 Procesamiento individual para resiliencia
- 📊 Respuestas detalladas con contadores
- 🎯 Continuación ante errores parciales

### **Seguridad:**
- 🔐 Autenticación JWT obligatoria
- 🛡️ Contraseñas hasheadas con BCrypt  
- 🔍 Validación de permisos por endpoint