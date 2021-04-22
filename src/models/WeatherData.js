class WeatherData {
    constructor(id, city_name, weather_description, humidity, wind, max_temp, min_temp, temprature, latitude, longitude) {
        this.id = id;
        this.city_name = city_name;
        this.weather_description = weather_description;
        this.humidity = humidity;
        this.wind = wind;
        this.max_temp = max_temp;
        this.min_temp = min_temp;
        this.temprature = temprature;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default WeatherData;