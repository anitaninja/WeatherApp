export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
import apiUrl from './apiUrl';
import WeatherData from '../../models/WeatherData';

export const fetchWeatherData = () => {

    return async (dispatch, getState) => {

        const response = await fetch(
            `${apiUrl.getData}`,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                }
            }
        );

        if (!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData);
            let message = 'Something went wrong!';
            if (errorResData.message)
                message = errorResData.message
            throw new Error(message);
        }
        const resData = await response.json();

        const loadedWeatherData = [];

        for (const key in resData.list) {
            loadedWeatherData.push(
                new WeatherData(
                    resData.list[key].id,
                    resData.list[key].name,
                    resData.list[key].weather[0].description,
                    resData.list[key].main.humidity,
                    resData.list[key].wind.speed,
                    resData.list[key].main.temp_max,
                    resData.list[key].main.temp_min,
                    resData.list[key].main.temp,
                    resData.list[key].coord.lat,
                    resData.list[key].coord.lon
                )
            );
        }

        dispatch({
            type: SET_WEATHER_DATA,
            weatherData: loadedWeatherData
        });
    };
};
