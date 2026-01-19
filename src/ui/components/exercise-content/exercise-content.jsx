import PropTypes from 'prop-types'
import './exercise-content.css'

function ExerciseContent({ title, children, variant = 'default' }) {
  return (
    <div className={`exercise-content exercise-content--${variant}`}>
      {title && (
        <div className="exercise-content__header">
          <h3 className="exercise-content__title">{title}</h3>
        </div>
      )}
      <div className="exercise-content__body">
        {children}
      </div>
    </div>
  )
}

ExerciseContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'solution', 'form', 'result'])
}

ExerciseContent.defaultProps = {
  title: null,
  variant: 'default'
}

export default ExerciseContent
