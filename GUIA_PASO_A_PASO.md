# 📚 Guía Paso a Paso - Ejercicio 1: Lista de Tareas

## 🎯 Objetivo del Ejercicio

Crear un proyecto de backend con los endpoints necesarios para:
- ✅ Agregar una tarea
- ✅ Listar todas las tareas existentes
- ✅ Borrar una tarea
- ✅ Editar una tarea
- ✅ Obtener una tarea por el nombre o identificador único
- ✅ Modelar la base de datos necesaria con MongoDB

---

## 📋 Paso 1: Entender qué necesitamos

### ¿Qué es un CRUD?
**CRUD** = Create, Read, Update, Delete (Crear, Leer, Actualizar, Eliminar)

Para nuestro ejercicio necesitamos:
- **Create (POST)**: Crear una nueva tarea
- **Read (GET)**: Leer tareas (todas, por ID, por nombre)
- **Update (PUT)**: Actualizar una tarea existente
- **Delete (DELETE)**: Eliminar una tarea

### ¿Qué es una API REST?
Una API REST es una forma de comunicar el frontend con el backend usando HTTP.

**Ejemplo:**
- Frontend (React) → Hace una petición HTTP → Backend (Node.js) → Responde con datos

---

## 🏗️ Paso 2: Planificar la estructura

### Estructura del Backend:
```
backend/
├── server.js              # Servidor principal
├── config/
│   └── database.js       # Conexión a MongoDB
├── models/
│   └── Task.model.js     # Modelo de datos (qué campos tiene una tarea)
├── controllers/  
│   └── task.controller.js # Lógica de negocio (qué hace cada endpoint)
└── routes/
    └── task.routes.js     # Definición de rutas (qué URL hace qué)
```

### Estructura del Frontend:
```
src/
├── services/
│   └── task.service.js   # Funciones para llamar al backend
├── ui/components/
│   ├── task-form/        # Formulario para crear/editar
│   └── task-list/       # Lista de tareas
└── ui/screen/
    └── exercise-1.jsx    # Pantalla principal del ejercicio
```

---

## 🗄️ Paso 3: Diseñar el Modelo de Datos

### ¿Qué información necesita una tarea?

Pensemos en una tarea real:
- **Título** (obligatorio): "Comprar leche"
- **Descripción** (opcional): "Ir al supermercado"
- **Estado**: ¿Está completada? (sí/no)
- **Prioridad**: baja, media, alta
- **Fecha de creación**: automática
- **ID único**: para identificarla

### Modelo en MongoDB:
```javascript
{
  _id: ObjectId,           // ID único (automático)
  title: String,           // Título (requerido)
  description: String,     // Descripción (opcional)
  completed: Boolean,      // Completada (default: false)
  priority: String,        // 'low', 'medium', 'high'
  createdAt: Date,        // Fecha creación (automático)
  updatedAt: Date         // Fecha actualización (automático)
}
```

---

## 🔧 Paso 4: Construir el Backend (Paso a Paso)

### 4.1 Instalar dependencias necesarias

```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

**¿Qué hace cada paquete?**
- `express`: Framework para crear el servidor
- `mongoose`: Para trabajar con MongoDB
- `cors`: Permite que el frontend se comunique con el backend
- `dotenv`: Para usar variables de entorno (.env)
- `nodemon`: Reinicia el servidor automáticamente cuando cambias código

### 4.2 Crear el servidor básico (server.js)

```javascript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares (funciones que se ejecutan antes de las rutas)
app.use(cors())              // Permite peticiones del frontend
app.use(express.json())      // Convierte JSON a objeto JavaScript

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
```

**¿Qué hace esto?**
- Crea un servidor Express
- Escucha en el puerto 3001
- Tiene una ruta de prueba en `/api/health`

### 4.3 Conectar a MongoDB (config/database.js)

```javascript
import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/tasks-db'
    )
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}
```

**¿Qué hace esto?**
- Se conecta a MongoDB
- Usa la URL de `.env` o una por defecto
- Si hay error, muestra el error y cierra el proceso

### 4.4 Crear el Modelo (models/Task.model.js)

```javascript
import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true,
    maxlength: [200, 'El título no puede exceder 200 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'La descripción no puede exceder 1000 caracteres']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  }
}, {
  timestamps: true  // Crea createdAt y updatedAt automáticamente
})

const Task = mongoose.model('Task', taskSchema)
export default Task
```

**¿Qué hace esto?**
- Define la estructura de una tarea
- Valida los datos (título requerido, prioridad solo puede ser low/medium/high)
- Crea automáticamente fechas de creación y actualización

### 4.5 Crear los Controladores (controllers/task.controller.js)

**¿Qué es un controlador?**
Es la función que se ejecuta cuando alguien hace una petición a una ruta.

#### Crear tarea (POST):
```javascript
export const createTask = async (req, res) => {
  try {
    const task = new Task(req.body)  // Crea una nueva tarea con los datos recibidos
    const savedTask = await task.save()  // Guarda en MongoDB
    res.status(201).json({
      success: true,
      data: savedTask
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
```

#### Obtener todas las tareas (GET):
```javascript
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })  // Busca todas, ordena por fecha
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
```

#### Obtener tarea por ID (GET):
```javascript
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)  // Busca por ID
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      })
    }
    res.status(200).json({
      success: true,
      data: task
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
```

#### Actualizar tarea (PUT):
```javascript
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,  // ID de la tarea
      req.body,       // Datos nuevos
      {
        new: true,           // Devuelve el documento actualizado
        runValidators: true  // Ejecuta las validaciones
      }
    )
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      })
    }
    
    res.status(200).json({
      success: true,
      data: task
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
```

#### Eliminar tarea (DELETE):
```javascript
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      })
    }
    
    res.status(200).json({
      success: true,
      message: 'Tarea eliminada correctamente',
      data: task
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
```

### 4.6 Crear las Rutas (routes/task.routes.js)

```javascript
import express from 'express'
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js'

const router = express.Router()

// Definir las rutas
router.post('/', createTask)        // POST /api/tasks
router.get('/', getAllTasks)        // GET /api/tasks
router.get('/:id', getTaskById)     // GET /api/tasks/:id
router.put('/:id', updateTask)      // PUT /api/tasks/:id
router.delete('/:id', deleteTask)   // DELETE /api/tasks/:id

export default router
```

**¿Qué hace esto?**
- Define qué función se ejecuta para cada ruta
- `router.post('/')` significa: cuando alguien hace POST a `/api/tasks`, ejecuta `createTask`

### 4.7 Conectar todo en server.js

```javascript
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database.js'
import taskRoutes from './routes/task.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(cors())
app.use(express.json())

// Conectar a MongoDB
connectDB()

// Routes
app.use('/api/tasks', taskRoutes)  // Todas las rutas de tareas empiezan con /api/tasks

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
```

---

## 🎨 Paso 5: Construir el Frontend (Paso a Paso)

### 5.1 Crear el Servicio (services/task.service.js)

**¿Qué es un servicio?**
Son funciones que hacen peticiones HTTP al backend.

```javascript
const API_URL = 'http://localhost:3001/api/tasks'

export const taskService = {
  // Crear una nueva tarea
  createTask: async (taskData) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)  // Convierte el objeto a JSON
    })
    return response.json()  // Convierte la respuesta a objeto JavaScript
  },

  // Obtener todas las tareas
  getAllTasks: async () => {
    const response = await fetch(API_URL)
    return response.json()
  },

  // Obtener una tarea por ID
  getTaskById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`)
    return response.json()
  },

  // Actualizar una tarea
  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    })
    return response.json()
  },

  // Eliminar una tarea
  deleteTask: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    return response.json()
  }
}
```

**¿Qué hace esto?**
- `fetch()` es la función nativa de JavaScript para hacer peticiones HTTP
- Cada función hace una petición diferente (POST, GET, PUT, DELETE)
- Devuelve los datos en formato JSON

### 5.2 Crear el Formulario (components/task-form)

**¿Qué necesita un formulario?**
- Campos para ingresar datos (título, descripción, prioridad)
- Validación (asegurarse que los datos sean correctos)
- Función para enviar los datos

Usaremos `react-hook-form` para manejar el formulario fácilmente.

### 5.3 Crear la Lista (components/task-list)

**¿Qué necesita una lista?**
- Mostrar todas las tareas
- Botones para editar, eliminar, marcar como completada
- Mostrar información de cada tarea

### 5.4 Conectar todo en exercise-1.jsx

**Flujo:**
1. Al cargar la página → Cargar todas las tareas
2. Usuario crea tarea → Llamar a `createTask` → Recargar lista
3. Usuario edita tarea → Llamar a `updateTask` → Recargar lista
4. Usuario elimina tarea → Llamar a `deleteTask` → Recargar lista

---

## 🧪 Paso 6: Probar cada parte

### 6.1 Probar el Backend

1. Iniciar MongoDB:
   ```bash
   mongod
   ```

2. Iniciar el servidor:
   ```bash
   npm run backend
   ```

3. Probar con Postman o curl:
   ```bash
   # Crear una tarea
   curl -X POST http://localhost:3001/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title":"Mi primera tarea","description":"Descripción","priority":"high"}'
   
   # Obtener todas las tareas
   curl http://localhost:3001/api/tasks
   ```

### 6.2 Probar el Frontend

1. Iniciar el frontend:
   ```bash
   npm run dev
   ```

2. Abrir en el navegador: `http://localhost:3000`

3. Probar crear, editar, eliminar tareas desde la interfaz

---

## 📝 Resumen del Flujo Completo

```
Usuario hace clic en "Crear Tarea"
    ↓
Formulario envía datos
    ↓
taskService.createTask() hace POST a /api/tasks
    ↓
Backend recibe la petición en task.routes.js
    ↓
Se ejecuta createTask() en task.controller.js
    ↓
Se crea una nueva Task con Task.model.js
    ↓
Se guarda en MongoDB
    ↓
Backend responde con la tarea creada
    ↓
Frontend recibe la respuesta
    ↓
Se actualiza la lista de tareas
    ↓
Usuario ve la nueva tarea en la lista
```

---

## ✅ Checklist de Implementación

### Backend:
- [ ] Instalar dependencias
- [ ] Crear server.js básico
- [ ] Configurar conexión a MongoDB
- [ ] Crear modelo Task
- [ ] Crear controlador con todas las funciones CRUD
- [ ] Crear rutas
- [ ] Probar cada endpoint

### Frontend:
- [ ] Crear servicio task.service.js
- [ ] Crear componente TaskForm
- [ ] Crear componente TaskList
- [ ] Integrar en exercise-1.jsx
- [ ] Probar crear, editar, eliminar tareas

---

## 🎓 Conceptos Clave Aprendidos

1. **API REST**: Comunicación entre frontend y backend usando HTTP
2. **MVC Pattern**: Separar Modelo, Vista, Controlador
3. **MongoDB**: Base de datos NoSQL para guardar datos
4. **Mongoose**: Librería para trabajar con MongoDB en Node.js
5. **React Hooks**: useState, useEffect para manejar estado
6. **Async/Await**: Para manejar operaciones asíncronas

---

## 🚀 Siguiente Paso

Ahora que entiendes el proceso, podemos implementarlo paso a paso juntos. ¿Por dónde quieres empezar?

1. ¿Configurar el backend desde cero?
2. ¿Crear el modelo de datos primero?
3. ¿Implementar un endpoint a la vez?
