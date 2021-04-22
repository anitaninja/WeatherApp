import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Color from '../constants/Color';

import CityWeatherScreen from '../screens/CityWeatherScreen';
import WeatherOverviewScreen from '../screens/WeatherOverviewScreen';

const Stack = createStackNavigator();

const WeatherScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Color.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontSize: 22
                },
                title: 'Weather App',
                headerTitleAlign: 'center',
            }}
            initialRouteName={'WeatherOverview'}>
            <Stack.Screen name="WeatherOverview" component={WeatherOverviewScreen} />
            <Stack.Screen name="CityWeather" component={CityWeatherScreen} />
        </Stack.Navigator>
    );
};

export default WeatherScreenStack;
