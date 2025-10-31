# ESTÁNDARES DE CÓDIGO - SISTEMA GESTIÓN ESCOLAR

## 📋 ÍNDICE

1. [Naming Conventions](#1-naming-conventions)
2. [Estructura de Código](#2-estructura-de-código)
3. [Comentarios y Documentación](#3-comentarios-y-documentación)
4. [Mejores Prácticas Java](#4-mejores-prácticas-java)
5. [Estándares TypeScript/Frontend](#5-estándares-typescriptfrontend)
6. [Checklist de Code Review](#6-checklist-de-code-review)

---

## 1. NAMING CONVENTIONS

### 🎯 **Java Backend**

#### **✅ Clases (PascalCase)**
```java
// ✅ CORRECTO
public class AlumnoService { }
public class PasswordService { }
public class AlumnoRequestDTO { }

// ❌ INCORRECTO
public class alumnoService { }
public class Alumno_Service { }
```

#### **✅ Variables y Métodos (camelCase)**
```java
// ✅ CORRECTO - Variables
private Long id;
private String nombre;
private LocalDate fechaNacimiento;
private AlumnoRepository alumnoRepository;

// ✅ CORRECTO - Métodos
public void setNombre(String nombre) { }
public AlumnoResponseDTO crearAlumno(AlumnoRequestDTO dto) { }
public List<Alumno> obtenerAlumnosActivos() { }

// ❌ INCORRECTO
private Long Id;  // PascalCase en variable
public void setNombre(String Nombre) { }  // PascalCase en parámetro
private String fecha_nacimiento;  // snake_case
```

#### **✅ Constantes (UPPER_SNAKE_CASE)**
```java
// ✅ CORRECTO
public static final String DEFAULT_PASSWORD_PREFIX = "AL";
public static final int MAX_BATCH_SIZE = 100;
private static final Logger log = LoggerFactory.getLogger(AlumnoService.class);

// ❌ INCORRECTO
public static final String defaultPasswordPrefix = "AL";
public static final String DEFAULT-PASSWORD-PREFIX = "AL";
```

#### **✅ Paquetes (lowercase)**
```java
// ✅ CORRECTO
package com.demo.sistema_gestion_escolar.service;
package com.demo.sistema_gestion_escolar.dto;
package com.demo.sistema_gestion_escolar.security;

// ❌ INCORRECTO
package com.demo.Sistema_Gestion_Escolar.Service;
package com.demo.sistemaGestionEscolar.DTO;
```

### 🎯 **TypeScript/Frontend**

#### **✅ Variables y Funciones (camelCase)**
```typescript
// ✅ CORRECTO
const studentName = "Juan Pérez";
const fetchStudents = async () => { };
const isLoading = true;

// ❌ INCORRECTO
const StudentName = "Juan Pérez";
const fetch_students = async () => { };
```

#### **✅ Interfaces y Types (PascalCase)**
```typescript
// ✅ CORRECTO
interface Student { }
type CreateStudentRequest = { };
interface AlumnoResponseDTO { }

// ❌ INCORRECTO
interface student { }
type createStudentRequest = { };
```

#### **✅ Componentes React (PascalCase)**
```typescript
// ✅ CORRECTO
export const StudentDialog = () => { };
export const StudentsTable = () => { };

// ❌ INCORRECTO
export const studentDialog = () => { };
export const Students_table = () => { };
```

---

## 2. ESTRUCTURA DE CÓDIGO

### 🏗️ **Organización de Clases Java**

```java
@Entity
@Table(name = "alumnos")
public class Alumno extends BaseEntity {

    // 1. CAMPOS PRIVADOS (ordenados por importancia)
    @NotBlank(message = "El nombre no puede estar vacío")
    @Column(nullable = false, length = 50)
    private String nombre;

    @NotBlank(message = "El apellido no puede estar vacío")
    @Column(nullable = false, length = 50)
    private String apellido;

    @Email(message = "El email debe tener un formato válido")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    // 2. CONSTRUCTORES
    public Alumno() { }

    public Alumno(String nombre, String apellido, String email, LocalDate fechaNacimiento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.fechaNacimiento = fechaNacimiento;
    }

    // 3. GETTERS Y SETTERS (ordenados por campo)
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // 4. MÉTODOS DE NEGOCIO
    public boolean esEmailValido() {
        return email != null && email.contains("@");
    }

    // 5. EQUALS, HASHCODE, TOSTRING (si es necesario)
}
```

### 🎯 **Organización de Services**

```java
@Service
@Slf4j  // Lombok logging
public class AlumnoService {

    // 1. DEPENDENCIAS INYECTADAS
    private final AlumnoRepository alumnoRepository;
    private final PasswordService passwordService;

    // 2. CONSTRUCTOR (preferido sobre @Autowired)
    public AlumnoService(AlumnoRepository alumnoRepository, PasswordService passwordService) {
        this.alumnoRepository = alumnoRepository;
        this.passwordService = passwordService;
    }

    // 3. MÉTODOS PÚBLICOS (API del servicio)
    public AlumnoResponseDTO crearAlumno(AlumnoRequestDTO dto) {
        log.info("Creando alumno con email: {}", dto.getEmail());
        
        validateUniqueEmail(dto.getEmail());
        
        Alumno alumno = mapToEntity(dto);
        generateDefaultPassword(alumno);
        
        Alumno savedAlumno = alumnoRepository.save(alumno);
        
        log.info("Alumno creado exitosamente con ID: {}", savedAlumno.getId());
        return mapToResponseDTO(savedAlumno);
    }

    // 4. MÉTODOS PRIVADOS DE APOYO
    private void validateUniqueEmail(String email) {
        if (alumnoRepository.existsByEmail(email)) {
            throw new EmailAlreadyExistsException("Email ya registrado: " + email);
        }
    }

    private void generateDefaultPassword(Alumno alumno) {
        if (alumno.getFechaNacimiento() != null && alumno.getContrasena() == null) {
            String hashedPassword = passwordService.generarContrasenaAlumno(alumno.getFechaNacimiento());
            alumno.setContrasena(hashedPassword);
        }
    }
}
```

---

## 3. COMENTARIOS Y DOCUMENTACIÓN

### 📝 **JavaDoc para métodos públicos**

```java
/**
 * Crea un nuevo alumno en el sistema con contraseña generada automáticamente.
 * 
 * @param dto Datos del alumno a crear (nombre, apellido, email, fecha de nacimiento)
 * @return DTO con los datos del alumno creado (sin contraseña)
 * @throws EmailAlreadyExistsException si el email ya está registrado
 * @throws ValidationException si los datos de entrada son inválidos
 */
public AlumnoResponseDTO crearAlumno(AlumnoRequestDTO dto) {
    // implementación
}
```

### 💬 **Comentarios de código**

```java
// ✅ BUENOS comentarios (explican el "por qué")
// Generar contraseña automática basada en fecha de nacimiento para facilitar acceso inicial
String password = generateDefaultPassword(alumno.getFechaNacimiento());

// Validar unicidad del email antes de guardar para evitar constraint violations
validateUniqueEmail(dto.getEmail());

// ❌ MALOS comentarios (explican el "qué" obvio)
// Setear el nombre del alumno
alumno.setNombre(dto.getNombre());

// Guardar en la base de datos
alumnoRepository.save(alumno);
```

### 🏷️ **TODO y FIXME**

```java
// TODO: Implementar validación de formato de email más robusta
// FIXME: Manejar excepción específica cuando el email ya existe
// HACK: Workaround temporal hasta que se implemente cache de usuarios
```

---

## 4. MEJORES PRÁCTICAS JAVA

### 🎯 **Inyección de Dependencias**

```java
// ✅ PREFERIDO - Constructor injection
@Service
public class AlumnoService {
    private final AlumnoRepository alumnoRepository;
    
    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }
}

// ❌ EVITAR - Field injection (dificulta testing)
@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;
}
```

### 🔒 **Inmutabilidad y Final**

```java
// ✅ USAR final en campos que no cambien
private final AlumnoRepository alumnoRepository;
private final PasswordService passwordService;

// ✅ USAR final en variables que no cambien
public void processAlumnos(List<Alumno> alumnos) {
    final int batchSize = 100;
    final String defaultRole = "STUDENT";
    
    for (final Alumno alumno : alumnos) {
        // procesar alumno
    }
}
```

### 🏷️ **Validaciones**

```java
// ✅ Validar parámetros de entrada
public AlumnoResponseDTO crearAlumno(AlumnoRequestDTO dto) {
    Objects.requireNonNull(dto, "AlumnoRequestDTO no puede ser null");
    Objects.requireNonNull(dto.getEmail(), "Email no puede ser null");
    
    // lógica del método
}

// ✅ Usar Optional para valores que pueden ser null
public Optional<Alumno> buscarPorEmail(String email) {
    return alumnoRepository.findByEmail(email);
}
```

---

## 5. ESTÁNDARES TYPESCRIPT/FRONTEND

### 📁 **Estructura de archivos**

```
frontend/
├── components/
│   ├── students/          # PascalCase para carpetas de componentes
│   │   ├── StudentDialog.tsx
│   │   ├── StudentsTable.tsx
│   │   └── StudentForm.tsx
│   └── ui/               # lowercase para utilidades
│       ├── button.tsx
│       └── input.tsx
├── hooks/                # lowercase
│   ├── use-students.ts
│   └── use-auth.ts
├── lib/                  # lowercase
│   ├── api.ts
│   └── utils.ts
└── types/               # lowercase
    └── index.ts
```

### 🔤 **Naming en TypeScript**

```typescript
// ✅ Interfaces y tipos
interface Student {
    id: number;
    name: string;
    email: string;
    birthDate: string;
}

type CreateStudentRequest = Pick<Student, 'name' | 'email' | 'birthDate'>;

// ✅ Funciones y variables
const fetchStudents = async (): Promise<Student[]> => {
    const response = await api.get('/api/v1/alumnos');
    return response.data;
};

const studentName = "Juan Pérez";
const isLoading = false;

// ✅ Constantes
const API_BASE_URL = 'http://localhost:8080';
const MAX_STUDENTS_PER_PAGE = 20;
```

---

## 6. CHECKLIST DE CODE REVIEW

### ✅ **Naming Conventions**
- [ ] Variables en camelCase
- [ ] Clases en PascalCase  
- [ ] Constantes en UPPER_SNAKE_CASE
- [ ] Métodos descriptivos y en camelCase
- [ ] Paquetes en lowercase

### ✅ **Estructura**
- [ ] Campos privados con final cuando corresponde
- [ ] Constructor injection en lugar de field injection
- [ ] Métodos ordenados (públicos arriba, privados abajo)
- [ ] Imports organizados y sin unused

### ✅ **Documentación**
- [ ] JavaDoc en métodos públicos
- [ ] Comentarios explican "por qué", no "qué"
- [ ] TODOs tienen contexto y responsable

### ✅ **Validaciones**
- [ ] Parámetros validados (null checks)
- [ ] Uso de Optional cuando corresponde
- [ ] Exception handling específico

### ✅ **Performance**
- [ ] No hay N+1 queries
- [ ] Uso eficiente de colecciones
- [ ] Lazy loading configurado correctamente

---

## 🚀 **HERRAMIENTAS RECOMENDADAS**

### 🔧 **Para Java**
```xml
<!-- CheckStyle -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-checkstyle-plugin</artifactId>
    <version>3.1.2</version>
</plugin>

<!-- SpotBugs -->
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.7.3</version>
</plugin>
```

### 🔧 **Para TypeScript**
```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],
  "rules": {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variableLike",
        "format": ["camelCase"]
      },
      {
        "selector": "typeLike",
        "format": ["PascalCase"]
      }
    ]
  }
}
```

---

## 📞 **APLICACIÓN INMEDIATA**

Para aplicar estos estándares al proyecto actual:

1. **Corregir naming inconsistencies** en `Alumno.java`
2. **Actualizar imports** y comentarios confusos
3. **Implementar constructor injection** donde sea necesario
4. **Agregar validaciones de parámetros**
5. **Standardizar JavaDoc** en métodos públicos

Este documento servirá como referencia para mantener calidad y consistencia en todo el desarrollo futuro del proyecto.