# CHANGELOG - SISTEMA DE GESTIÓN ESCOLAR

## [v1.1] - 2025-09-30: Alineación Frontend-Backend

### 🎯 **OBJETIVO**
Alinear el frontend Next.js generado por v0.dev con la arquitectura backend Spring Boot existente.

### ✅ **CAMBIOS IMPLEMENTADOS**

#### **Módulo Materia - COMPLETADO**
- **Backend:**
  - ✅ Creado `MateriaRequestDTO.java` (nomenclatura consistente)
  - ✅ Creado `MateriaResponseDTO.java` con datos completos del profesor
  - ✅ Actualizado `MateriaController.java` para usar DTOs
  - ✅ Actualizado `MateriaService.java` con conversión DTO→Entidad
  - ✅ Solucionado problema de `@JsonBackReference` con DTO de respuesta

- **Frontend:**
  - ✅ Actualizado `types.ts` - Subject interface con datos completos del profesor
  - ✅ Actualizado `CreateSubjectRequest` - usar `profesorId` (número) 
  - ✅ Actualizado `subject-dialog.tsx` - envío de `profesorId` al backend
  - ✅ Actualizado `subjects-table.tsx` - mostrar nombres de profesores desde DTO
  - ✅ Simplificado carga de datos - sin llamadas adicionales innecesarias

#### **Patrón Establecido**
- **Request DTOs:** Reciben IDs para relaciones (ej: `profesorId`)
- **Response DTOs:** Devuelven objetos completos para visualización
- **Nomenclatura:** `*RequestDTO` / `*ResponseDTO` (consistente con AlumnoDTO, InscripcionDTO)
- **Validaciones:** Backend maneja validación de existencia de referencias

### 🧪 **TESTING**
- ✅ Crear materia: Funcional sin errores HTTP 400
- ✅ Editar materia: Funcional sin errores HTTP 404  
- ✅ Listar materias: Muestra nombres completos de profesores
- ✅ Búsqueda: Por nombre de materia y nombre de profesor
- ✅ Eliminar materia: Funcional

### 📚 **ARQUITECTURA MEJORADA**
- **Separación de responsabilidades:** DTOs desacoplan API de entidades JPA
- **Performance:** Evita N+1 queries con DTOs optimizados  
- **Mantenibilidad:** Cambios en entidades no afectan contratos de API
- **Consistencia:** Nomenclatura uniforme en todo el sistema

### 🚀 **PRÓXIMOS MÓDULOS**
- [ ] Curso (Sprint 5-6)
- [ ] Inscripción (Sprint 7-8) 
- [ ] Dictado (Sprint 9-10)
- [ ] Testing integración completa (Sprint 11)

---

### 🎓 **PARA DOCUMENTACIÓN ACADÉMICA**
Este refactor demuestra:
- **Patrón DTO** para transferencia de datos
- **Arquitectura por capas** bien definida
- **Separación frontend/backend** con contratos claros
- **Manejo de relaciones JPA** sin referencias circulares
- **Principios SOLID** aplicados en práctica

---

## [v1.2] - 2025-10-17: Nuevas funciones UI y soporte de horarios para Materias

### 🎯 OBJETIVO
Agregar soporte de horarios a las materias (backend + migración), mostrar horarios reales en el calendario del dashboard y seguir ajustando la UI (páginas de Configuración y Reportes, mejoras visuales en dashboard y login).

### ✅ CAMBIOS IMPLEMENTADOS

#### Backend - Materia / Horarios
- ✅ Añadidos campos de horario a la entidad `Materia`: `diaSemana`, `horaInicio`, `horaFin`.
- ✅ Actualizados DTOs: `MateriaRequestDTO`, `MateriaResponseDTO` para aceptar/retornar horarios.
- ✅ Validaciones: formato `HH:mm` en DTOs y validación de negocio en `MateriaService` (horaFin debe ser posterior a horaInicio).
- ✅ Controller: `MateriaController` ahora devuelve `MateriaResponseDTO` y mapea los nuevos campos.
- ✅ SQL: script de migración `docs/ADD_MATERIA_HORARIOS.sql` incluido.

Archivos relevantes (backend):
- `src/main/java/.../model/Materia.java`
- `src/main/java/.../dto/MateriaRequestDTO.java`
- `src/main/java/.../dto/MateriaResponseDTO.java`
- `src/main/java/.../service/MateriaService.java`
- `src/main/java/.../controller/MateriaController.java`

#### Frontend - Formularios, Tabla y Calendario
- ✅ `frontend/lib/types.ts`: `Subject` y `CreateSubjectRequest` incluyen `diaSemana`, `horaInicio`, `horaFin`.
- ✅ `frontend/components/subjects/subject-dialog.tsx`: formulario de creación/edición incluye selector de día y campos `time` para inicio/fin.
- ✅ `frontend/components/subjects/subjects-table.tsx`: nueva columna "Horario" y muestra día + rango horario.
- ✅ `frontend/components/academic-calendar.tsx`: ahora carga `dictados` y `materias` desde la API y renderiza una grilla por hora/día con horarios reales (uso de hora local y fallback a fecha de dictado cuando corresponde).

Archivos relevantes (frontend):
- `frontend/lib/types.ts`
- `frontend/lib/api/subjects.ts`, `frontend/lib/api/dictados.ts`
- `frontend/components/subjects/subject-dialog.tsx`
- `frontend/components/subjects/subjects-table.tsx`
- `frontend/components/academic-calendar.tsx`

#### UI / UX y nuevas páginas (solo diseño)
- ✅ Rediseño / branding aplicado en dashboard y login (color principal #450920 y ajustes visuales consistentes).
- ✅ Componente `DashboardStats` y `YearDistribution` implementados/ajustados.
- ✅ Añadidas páginas de diseño: `/configuracion` y `/reportes` (solo frontend/UI).
- ✅ Sidebar actualizado: agregados enlaces a `Reportes` y `Configuración` y reordenado `Reportes` para quedar debajo de `Inscripciones`.

Archivos relevantes (UI):
- `frontend/app/configuracion/page.tsx`
- `frontend/app/reportes/page.tsx`
- `frontend/components/app-sidebar.tsx`

#### Documentación
- ✅ Nuevo documento técnico inicial: `docs/Documentacion_17-10.md` con arquitectura, 4+1, DER, flujo de datos, casos de uso y bocetos.

### 🧪 TESTING / PENDIENTES
- ⚠️ Base de datos: aplicar `docs/ADD_MATERIA_HORARIOS.sql` en la BD de destino antes de crear/editar materias con horarios.
- ⚠️ Pruebas end-to-end manuales: crear/editar materias con horario, crear dictados y verificar calendario (pendiente).
- ✅ Frontend: componentes client-side marcados como `use client` cuando usan hooks (fix aplicado en `academic-calendar.tsx`).

### 📌 NOTAS / RECOMENDACIONES
- Convertir las validaciones horario en mensajes UI-friendly (mostrar errores desde backend en `subject-dialog`).
- Homogeneizar almacenamiento de horarios (usar tipo TIME en DB y almacenar en UTC si hay usuarios en múltiples zonas horarias).
- Añadir pruebas E2E (Playwright/Cypress) para flujos: crear materia+dictado → calendario.

---

Si querés, puedo detallar los endpoints involucrados en `materias` y `dictados`, generar diagramas ERD gráficos (dbdiagram.io) o preparar una checklist para desplegar la migración en staging. ¿Qué preferís que haga a continuación?