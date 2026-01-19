import { Link } from 'react-router-dom'
import CardExercise from '../components/card-exercise/card-exercise'
import ExerciseContent from '../components/exercise-content/exercise-content'

function Exercise1() {
  return (
    <div>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', textDecoration: 'none' }}>
        <button style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#667eea', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          ← Volver al inicio
        </button>
      </Link>
      
      {/* Card del ejercicio (información) */}
      <CardExercise
        title="Lista de tareas"
        description="Crear un proyecto de backend con los endpoints necesarios para poder agregar una tarea, 
        listar todas las tareas existentes, borrar una tarea, editar una tarea y obtener una tarea por el nombre
        o identificador único. 
        Modelar la base de datos necesaria con MongoDB."
        exerciseNumber={1}
        difficulty="easy"
      />

      {/* Aquí iremos agregando la solución paso a paso */}
      <ExerciseContent 
        title="Solución del Ejercicio"
        variant="solution"
      >
        <p>Vamos a construir la solución paso a paso siguiendo la guía.</p>
        <p>Empecemos por el Paso 1: Entender qué necesitamos</p>
      </ExerciseContent>
    </div>
  )
}

export default Exercise1

