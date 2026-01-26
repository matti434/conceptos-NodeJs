# Estructura del Proyecto - Conceptos NodeJs

## 📁 Estructura de Carpetas

```
conceptos-NodeJs/
├── backend/                    # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── database.js        # Configuración de MongoDB
│   ├── controllers/
│   │   └── task.controller.js  # Lógica de negocio (CRUD)
│   ├── models/
│   │   └── Task.model.js       # Modelo de datos (Mongoose)
│   ├── routes/
│   │   └── task.routes.js      # Definición de rutas
│   └── server.js               # Servidor Express
│
├── src/                        # Frontend (React + Vite)
│   ├── services/
│   │   └── task.service.js     # Servicios API (fetch)
│   ├── ui/
│   │   ├── components/         # Componentes reutilizables
│   │   │   ├── card-exercise/  # Card para mostrar ejercicios
│   │   │   ├── exercise-content/ # Contenedor para soluciones
│   │   │   ├── task-form/      # Formulario de tareas
│   │   │   └── task-list/      # Lista de tareas
│   │   └── screen/             # Pantallas/páginas
│   │       ├── Home.jsx         # Página principal
│   │       ├── exercise-1.jsx   # Ejercicio 1 (resuelto)
│   │       └── exercise-2.jsx  # Ejercicio 2
│   ├── App.jsx                  # Componente principal
│   └── main.jsx                 # Punto de entrada
│
├── package.json
├── vite.config.js
└── .env                         # Variables de entorno
```

## 🏗️ Arquitectura

### Backend (API REST)

**Patrón: MVC (Model-View-Controller)**

- **Models**: Esquemas de MongoDB con Mongoose
- **Controllers**: Lógica de negocio y manejo de requests
- **Routes**: Definición de endpoints
- **Config**: Configuración de base de datos

### Frontend (React)

**Patrón: Component-Based Architecture**

- **Services**: Comunicación con API
- **Components**: Componentes reutilizables
- **Screens**: Páginas/pantallas completas

## 🔌 Endpoints del Backend

### Base URL: `http://localhost:3001/api/tasks`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/` | Crear nueva tarea |
| GET | `/` | Obtener todas las tareas |
| GET | `/:id` | Obtener tarea por ID |
| GET | `/search/:name` | Buscar tareas por nombre |
| PUT | `/:id` | Actualizar tarea |
| DELETE | `/:id` | Eliminar tarea |

## 📦 Modelo de Datos (Task)

```javascript
{
  title: String (requerido, max 200 chars),
  description: String (opcional, max 1000 chars),
  completed: Boolean (default: false),
  priority: String (enum: 'low', 'medium', 'high'),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

## 🚀 Comandos Disponibles

```bash
# Desarrollo Frontend
npm run dev

# Desarrollo Backend
npm run backend

# Ambos simultáneamente
npm run dev:full

# Build producción
npm run build
```

## ⚙️ Configuración

### Variables de Entorno (.env)

```env
MONGODB_URI=mongodb://localhost:27017/tasks-db
PORT=3001
```

## 📝 Flujo de Datos

1. **Usuario interactúa** → Componente React
2. **Componente llama** → Service (task.service.js)
3. **Service hace fetch** → Backend API
4. **Backend procesa** → Controller → Model → MongoDB
5. **Respuesta vuelve** → Service → Componente → UI

## 🎯 Ventajas de esta Estructura

✅ **Separación de responsabilidades**: Backend y Frontend separados
✅ **Escalable**: Fácil agregar nuevos ejercicios/features
✅ **Mantenible**: Código organizado y modular
✅ **Reutilizable**: Componentes y servicios reutilizables
✅ **Testeable**: Cada capa puede testearse independientemente
