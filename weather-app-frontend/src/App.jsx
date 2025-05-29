import './App.css'
import { useState, useEffect } from 'react'
import Form from './components/Form'
import WeatherResults from './components/WeatherResults'
import WeatherIcon from './components/WeatherIcon'
import toast from 'react-hot-toast'

function App() {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDaytime, setIsDaytime] = useState(true)

  // Detect day/night based on current time
  useEffect(() => {
    const hour = new Date().getHours()
    setIsDaytime(hour >= 6 && hour < 18)
  }, [])

  const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

  const getWeather = async () => {
    if (!location.trim()) {
      toast.error('Please enter a location')
      return
    }

    setIsLoading(true)
    setWeatherData(null)

    try {
      const capitalizedLocation = location.trim().charAt(0).toUpperCase() + location.trim().slice(1)

      const response = await fetch(`${SERVER_URL}/weather/today`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ location: capitalizedLocation })
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
      
      const data = await response.json()
      console.log('Backend Response:', data)

      if (data.error) {
        toast.error(data.message || 'City not found')
      } else {
        setWeatherData(data)
      }
    } catch (err) {
      console.error('Fetch Error:', err)
      toast.error(err.message || 'Failed to fetch weather data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getWeather()
  }

  return (
    <article className={`weatherApp ${isDaytime ? 'daytime' : 'nighttime'}`}>
      <div className={`weatherContainer ${isDaytime ? 'daytime-bg' : 'nighttime-bg'}`}>
        {isLoading ? (
          <p>Loading weather data...</p>
        ) : (
          <>
            <WeatherResults weatherData={weatherData} isDaytime={isDaytime} />
            {!weatherData ? (
              <>
                <WeatherIcon isDaytime={isDaytime} />
                <Form
                  location={location}
                  setLocation={setLocation}
                  handleSubmit={handleSubmit}
                  isDaytime={isDaytime}
                />
              </>
            ) : (
              <Form
                location={location}
                setLocation={setLocation}
                handleSubmit={handleSubmit}
                isDaytime={isDaytime}
              />
            )}
          </>
        )}
      </div>
    </article>
  )
}

export default App