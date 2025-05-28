import PropTypes from 'prop-types'
import './WeatherResults.css'
import countries from 'i18n-iso-countries'

const WeatherResults = ({ weatherData, isDaytime }) => {
  if (!weatherData) return null

  const { city, temperature, unit, error, message } = weatherData
  const countryCode = weatherData?.countryCode;
  const countryName = countryCode ? countries.getName(countryCode, 'en') : '';

  if (error) {
    return <p className="error-message">{message || 'City not found'}</p>
  }

  return (
    <div className="weather__results">
      <h2 className={`cityName ${isDaytime ? '' : 'night-text'}`}>{city}</h2>
      {countryName && <p className={`country ${isDaytime ? '' : 'night-text'}`}>{countryName.toUpperCase()}</p>}
      <div className="flex-align-justify-center weather__temperature">
        <p className={`weather__current-temp ${isDaytime ? '' : 'night-text'}`}>
          {Math.round(temperature)}
          <span className="deg">°{unit || 'C'}</span>
        </p>
      </div>
    </div>
  )
}

WeatherResults.propTypes = {
  weatherData: PropTypes.shape({
    city: PropTypes.string,
    temperature: PropTypes.number,
    unit: PropTypes.string,
    error: PropTypes.bool,
    message: PropTypes.string,
    countryCode: PropTypes.string
  }),
  isDaytime: PropTypes.bool
}

export default WeatherResults