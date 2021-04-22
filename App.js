import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, Platform, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import WeatherNavigator from './src/navigation/WeatherNavigator';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PushNotification from 'react-native-push-notification';

import weatherReducer from './src/redux/reducers/weatherReducer';
import Geolocation from '@react-native-community/geolocation';

export default function App() {
  const rootReducer = combineReducers({
    weatherData: weatherReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');

  console.disableYellowBox = true;

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          ).catch(error => {
            console.log(error);
          });

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
            subscribeLocationLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission().catch(error => {
      console.log(error);
    });
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setLocationStatus('You are Here');
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        setLocationStatus('You are Here');
        console.log(position);
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        setCurrentLongitude(currentLongitude);
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  console.log(locationStatus);

  useEffect(async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${currentLatitude}&lon=${currentLongitude}&appid=346aed8820ff6cce3216db560279237a`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    ).catch();

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData);
      let message = 'Something went wrong!';
      if (errorResData.message) message = errorResData.message;
      throw new Error(message);
    }
    const resData = await response.json();
    console.log('==> Current Temprature = ' + resData.main.temp);

    PushNotification.configure({
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.cancelAllLocalNotifications();
    weatherNotification(resData.main.temp);
  }, []);

  const weatherNotification = temp => {
    PushNotification.localNotificationSchedule({
      repeatType: 'hour',
      title: 'Weather App',
      message: 'Current Temprature: ' + temp + '\u2103',
      // date: new Date(Date.now() + 10 * 1000), //test
      allowWhileIdle: false,
      largeIcon: 'https://pic.onlinewebfonts.com/svg/img_296020.png',
    });
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <WeatherNavigator />
      </NavigationContainer>
    </Provider>
  );
}
