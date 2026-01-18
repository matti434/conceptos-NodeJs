import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './card-exercise.css'

function CardExercise({ title, description, children, exerciseNumber, difficulty, to }) {
  const CardContent = (
    <>
      <div className="card-exercise__header">
        {exerciseNumber && (
          <span className="card-exercise__number">Ejercicio {exerciseNumber}</span>
        )}
        <h2 className="card-exercise__title">{title}</h2>
        {description && (
          <p className="card-exercise__description">{description}</p>
        )}
      </div>
      <div className="card-exercise__body">
        {children}
      </div>
      {difficulty && (
        <div className="card-exercise__footer">
          <span 
            className="card-exercise__difficulty"
            data-difficulty={difficulty.toLowerCase()}
          >
            Dificultad: {difficulty.toUpperCase()}
          </span>
        </div>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className="card-exercise__link">
        <div className="card-exercise card-exercise--clickable">
          {CardContent}
        </div>
      </Link>
    )
  }

  return (
    <div className="card-exercise">
      {CardContent}
    </div>
  )
}

CardExercise.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  exerciseNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  difficulty: PropTypes.string,
  to: PropTypes.string
}

CardExercise.defaultProps = {
  description: '',
  children: null,
  exerciseNumber: null,
  difficulty: null,
  to: null
}

export default CardExercise
