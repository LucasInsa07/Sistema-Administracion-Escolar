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