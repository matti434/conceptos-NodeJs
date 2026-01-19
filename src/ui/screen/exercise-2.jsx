import { Link } from 'react-router-dom'
import CardExercise from '../components/card-exercise/card-exercise'
import ExerciseContent from '../components/exercise-content/exercise-content'

function Exercise2() {
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
        title="Lista de tareas (con frontend)"
        description="Unir el proyecto desarrollado en el punto anterior con el proyecto de frontend de lista de tareas trabajado en el módulo de react."
        exerciseNumber={2}
        difficulty="medium"
      />

      {/* Contenido/Solución del ejercicio */}
      <ExerciseContent 
        title="Solución del Ejercicio"
        variant="solution"
      >
        <p>Aquí va la solución del ejercicio 2</p>
        {/* Puedes agregar formularios, código, resultados, etc. */}
      </ExerciseContent>
    </div>
  )
}

export default Exercise2
