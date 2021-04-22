import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, Text, Button, FlatList, LogBox} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as weatherActions from '../redux/actions/weatherActions';
import CityWeather from '../components/CityWeather';

const WeatherOverviewScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const weatherData = useSelector(state => state.weatherData.weatherData);

  const loadWeatherData = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(weatherActions.fetchWeatherData());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);
  
  useEffect(async () => {
    setIsLoading(true);
    await loadWeatherData().then(() => {
      setIsLoading(false);
    });
  }, [loadWeatherData]);

  if (error) {
    console.log(error);
  }

  if (!isRefreshing && weatherData.length <= 0) {
    return (
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text> No Data Found</Text>
        <Button
          title="Try Again"
          onPress={() => {
            loadWeatherData;
          }}
        />
      </View>
    );
  }

  const renderData = itemData => {
    return (
      <CityWeather
        city={itemData.item.city_name}
        weather={itemData.item.weather_description}
        temprature={itemData.item.temprature}
        onSelect={() => {
          navigation.navigate('CityWeather', {
            cityData: itemData.item,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={loadWeatherData}
        refreshing={isRefreshing}
        keyExtractor={item => item.id.toString()}
        data={weatherData}
        renderItem={renderData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default WeatherOverviewScreen;
