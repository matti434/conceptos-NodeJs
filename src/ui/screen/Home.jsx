import CardExercise from '../components/card-exercise/card-exercise'

function Home() {
  return (
    <div>
      <h1>Exercises Backend Rolling Code</h1>

      <CardExercise
        title="Lista de tareas"
        description="Crear un proyecto de backend con los endpoints necesarios para poder agregar una tarea, 
        listar todas las tareas existentes, borrar una tarea, editar una tarea y obtener una tarea por el nombre
        o identificador único. 
        Modelar la base de datos necesaria con MongoDB."
        exerciseNumber={1}
        difficulty="easy"
        to="/exercise/1"
      >
      </CardExercise>

      <CardExercise
        title="Lista de tareas (con frontend)"
        description="Unir el proyecto desarrollado en el punto anterior con el proyecto de frontend de lista de tareas trabajado en el módulo de react."
        exerciseNumber={2}
        difficulty="medium"
        to="/exercise/2"
      >
      </CardExercise>
    </div>
  )
}

export default Home
