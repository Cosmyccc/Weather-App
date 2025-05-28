import PropTypes from 'prop-types'
import './Form.css'

const Form = ({ location, setLocation, handleSubmit, isDaytime }) => {
  return (
    <form onSubmit={handleSubmit} className="weather-form">
      <div className="form-group">
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city name"
          className={isDaytime ? '' : 'night-input'}
          aria-label="City name"
        />
        <button type="submit" className={isDaytime ? '' : 'night-button'}>
          Get Weather
        </button>
      </div>
    </form>
  )
}

Form.propTypes = {
  location: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isDaytime: PropTypes.bool.isRequired
}

export default Form