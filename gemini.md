# 📘 Guía de Desarrollo — Angular 21 + Tailwind CSS

## 🎯 Objetivo
Desarrollar una aplicación moderna en **Angular 21** utilizando **Tailwind CSS**, aplicando buenas prácticas de arquitectura, componentes reutilizables y diseño responsive (mobile-first).

---

## 🧱 Stack Tecnológico
- Angular 21 (Standalone Components)
- Tailwind CSS
- TypeScript
- RxJS
- Angular Signals (reactividad moderna)
- Angular Router

---

## 📁 Estructura del Proyecto


src/
│── app/
│ ├── core/ # Servicios globales, interceptores
│ ├── shared/ # Componentes reutilizables (buttons, modals, inputs)
│ ├── features/ # Módulos por funcionalidad (ej: admin, cliente)
│ ├── layout/ # Header, sidebar, footer
│ ── app.routes.ts


---

## ⚙️ Reglas de Desarrollo

### 🔹 Componentes
- Usar **Standalone Components**
- Mantener componentes pequeños y reutilizables
- Separar lógica de presentación
- Naming claro:
  - `user-card.component.ts`
  - `encomienda-table.component.ts`

---

### 🔹 Estilos (Tailwind)
- Usar clases utilitarias
- Evitar CSS personalizado innecesario
- Enfoque **mobile-first**
- Utilizar:
  - `flex`, `grid`
  - `gap`, `p`, `m`
  - `text`, `bg`, `rounded`, `shadow`

#### Ejemplo:
```html
<div class="p-4 bg-white rounded-2xl shadow-md">
  <h2 class="text-lg font-semibold">Título</h2>
</div>
📱 Responsive Design
Mobile → Tablet → Desktop
Tabla en desktop → Cards en móvil
Ejemplo:
<div class="hidden md:block">
  <!-- tabla -->
</div>

<div class="block md:hidden">
  <!-- cards -->
</div>

#### 🔄 Estado y Reactividad
Usar Signals preferentemente
Mantener estado local en componentes
Servicios solo para lógica compartida
#### 📝 Formularios
Usar Reactive Forms
Validaciones claras
Mensajes de error amigables
#### 🧩 Componentes Clave
📊 Tablas
Filtros en cabecera
Paginación
Ordenamiento
Responsive (cards en móvil)
🧾 Modales
Reutilizables
Animación suave
Cerrar con:
botón
fondo
tecla ESC
🔍 Filtros
Inputs
Selects con datos mock
Búsqueda en tiempo real
🎨 UX/UI
Diseño limpio y moderno
Espaciado consistente
Feedback visual (hover, loading)
Skeleton loaders
#### Performance
Lazy loading en rutas
Uso de trackBy en listas
Evitar renders innecesarios
#### Seguridad
Sanitizar inputs
Manejo de tokens con interceptores
No exponer lógica sensible
