import { SET_WEATHER_DATA } from '../actions/weatherActions';

const initialState = {
    weatherData: [],
};

export default (state = initialState, action) => {

    switch (action.type) {
        case SET_WEATHER_DATA:
            return {
                weatherData: action.weatherData,
            };

        default:
            return state;
    }

};