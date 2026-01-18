import { Link } from 'react-router-dom'
import CardExercise from '../components/card-exercise/card-exercise'

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
      <CardExercise
        title="Lista de tareas (con frontend)"
        description="Unir el proyecto desarrollado en el punto anterior con el proyecto de frontend de lista de tareas trabajado en el módulo de react."
        exerciseNumber={2}
        difficulty="medium"
      >
        <p>Aquí va el contenido específico del ejercicio 2</p>
        {/* Puedes agregar cualquier contenido aquí: formularios, botones, etc. */}
      </CardExercise>
    </div>
  )
}

export default Exercise2
