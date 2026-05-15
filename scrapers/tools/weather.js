const axios = require('axios')

async function weather(city) {
  const { data } = await axios.get(
    `https://wttr.in/${encodeURIComponent(city)}?format=j1`,
    { headers: { 'User-Agent': 'TrashcoreAPI/1.0' } }
  )

  const current  = data.current_condition[0]
  const area     = data.nearest_area[0]
  const today    = data.weather[0]
  const tomorrow = data.weather[1]

  return {
    location: {
      city:    area.areaName[0].value,
      region:  area.region[0].value,
      country: area.country[0].value,
      lat:     area.latitude,
      lon:     area.longitude
    },
    current: {
      temp_C:      current.temp_C,
      temp_F:      current.temp_F,
      feels_like_C: current.FeelsLikeC,
      feels_like_F: current.FeelsLikeF,
      humidity:    current.humidity,
      wind_kmph:   current.windspeedKmph,
      wind_dir:    current.winddir16Point,
      visibility:  current.visibility,
      pressure:    current.pressure,
      uv_index:    current.uvIndex,
      description: current.weatherDesc[0].value,
      icon:        current.weatherIconUrl[0].value,
      observed_at: current.localObsDateTime
    },
    today: {
      date:      today.date,
      max_C:     today.maxtempC,
      min_C:     today.mintempC,
      max_F:     today.maxtempF,
      min_F:     today.mintempF,
      avg_C:     today.avgtempC,
      uv_index:  today.uvIndex,
      sun_hours: today.sunHour,
      sunrise:   today.astronomy[0].sunrise,
      sunset:    today.astronomy[0].sunset,
      moon_phase: today.astronomy[0].moon_phase
    },
    tomorrow: {
      date:      tomorrow.date,
      max_C:     tomorrow.maxtempC,
      min_C:     tomorrow.mintempC,
      max_F:     tomorrow.maxtempF,
      min_F:     tomorrow.mintempF,
      avg_C:     tomorrow.avgtempC,
      uv_index:  tomorrow.uvIndex,
      sunrise:   tomorrow.astronomy[0].sunrise,
      sunset:    tomorrow.astronomy[0].sunset,
      moon_phase: tomorrow.astronomy[0].moon_phase
    }
  }
}

module.exports = { weather }