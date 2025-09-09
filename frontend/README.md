# Sistema de Administración Académica

Sistema completo de administración para escuelas secundarias desarrollado con Next.js 15 y TypeScript.

## Características

- **Dashboard Principal**: Estadísticas y resumen del sistema
- **Gestión de Alumnos**: CRUD completo con búsqueda avanzada
- **Gestión de Profesores**: Administración de docentes y especialidades
- **Gestión de Materias**: Control de asignaturas y profesores asignados
- **Gestión de Cursos**: Administración de divisiones y años
- **Sistema de Inscripciones**: Inscripción de alumnos a cursos
- **Sistema de Dictados**: Relación entre materias y cursos
- **Interfaz Responsive**: Diseño adaptable a todos los dispositivos

## Requisitos Previos

- Node.js 18+ 
- Backend Java Spring Boot corriendo en puerto 8080
- Base de datos MySQL configurada

## Instalación

### 1. Descargar el proyecto
Descarga el ZIP desde v0 o clona desde GitHub.

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:

\`\`\`env
# URL de tu API backend (opcional, por defecto usa http://localhost:8080/api)
NEXT_PUBLIC_API_URL=http://localhost:8080/api
\`\`\`

### 4. Ejecutar el proyecto
\`\`\`bash
npm run dev
\`\`\`

El sistema estará disponible en `http://localhost:3000`

## Configuración del Backend

### Endpoints esperados:
- `GET /api/alumnos` - Listar alumnos
- `POST /api/alumnos` - Crear alumno
- `PUT /api/alumnos/{id}` - Actualizar alumno
- `DELETE /api/alumnos/{id}` - Eliminar alumno

*(Similar para profesores, materias, cursos, inscripciones y dictados)*

### CORS Configuration (Spring Boot)
Asegúrate de tener CORS configurado en tu backend:

\`\`\`java
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AlumnoController {
    // ... tus endpoints
}
\`\`\`

O configuración global:
\`\`\`java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                .allowedHeaders("*");
    }
}
\`\`\`

## Estructura del Proyecto

\`\`\`
├── app/                    # Páginas de la aplicación
│   ├── alumnos/           # Gestión de alumnos
│   ├── profesores/        # Gestión de profesores
│   ├── materias/          # Gestión de materias
│   ├── cursos/            # Gestión de cursos
│   ├── inscripciones/     # Sistema de inscripciones
│   └── dictados/          # Sistema de dictados
├── components/            # Componentes reutilizables
│   ├── students/          # Componentes de alumnos
│   ├── teachers/          # Componentes de profesores
│   ├── subjects/          # Componentes de materias
│   ├── courses/           # Componentes de cursos
│   ├── enrollments/       # Componentes de inscripciones
│   └── dictados/          # Componentes de dictados
├── lib/                   # Utilidades y configuración
│   ├── api/              # Funciones de API
│   └── types.ts          # Definiciones de tipos
└── README.md             # Este archivo
\`\`\`

## Solución de Problemas

### Error "Failed to fetch"
1. **Verifica que el backend esté corriendo** en `http://localhost:8080`
2. **Revisa la configuración de CORS** en tu backend Spring Boot
3. **Confirma la variable de entorno** `NEXT_PUBLIC_API_URL` si usas una URL diferente

### Problemas de CORS
Si ves errores de CORS en la consola del navegador:
1. Asegúrate de tener `@CrossOrigin` en tus controladores
2. O configura CORS globalmente como se muestra arriba
3. Reinicia tu servidor Spring Boot después de los cambios

### Datos no se muestran
1. Verifica que tu backend devuelva datos en el formato JSON esperado
2. Revisa la consola del navegador para errores específicos
3. Confirma que los endpoints coincidan con los definidos en `/lib/api/`

## Despliegue

Para desplegar en producción:

1. **Build del proyecto**:
\`\`\`bash
npm run build
\`\`\`

2. **Configurar variable de entorno de producción**:
\`\`\`env
NEXT_PUBLIC_API_URL=https://tu-api-backend.com/api
\`\`\`

3. **Desplegar** usando Vercel, Netlify, o tu servidor preferido.

## Soporte

Si encuentras problemas:
1. Revisa que el backend esté corriendo y accesible
2. Verifica la configuración de CORS
3. Confirma que los endpoints devuelvan el formato JSON esperado
4. Revisa la consola del navegador para errores específicos
