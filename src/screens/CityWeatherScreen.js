import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const CityWeatherScreen = ({route, navigation}) => {
  const {cityData} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.mapContainer}>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: cityData.latitude,
              longitude: cityData.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              draggable
              coordinate={{
                latitude: cityData.latitude,
                longitude: cityData.longitude,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={cityData.city_name}
              description={cityData.temprature.toString()}
            />
          </MapView>
        </View>
      </View>
      <View style={styles.dataContainer}>
        <View>
          <Text style={styles.dataTitle}>{cityData.city_name}</Text>
          <Text style={styles.dataText}>Humidity: {cityData.humidity}</Text>
          <Text style={styles.dataText}>Wind Speed: {cityData.wind}</Text>
          <Text style={styles.dataText}>
            Max. Temp.: {cityData.max_temp}&deg;c
          </Text>
          <Text style={styles.dataText}>
            Min. Temp.: {cityData.min_temp}&deg;c
          </Text>
        </View>
        <View style={styles.imageContainer}>
          <Text style={{...styles.dataText, fontSize: 30, fontWeight: '500'}}>
            {cityData.temprature}&deg;c
          </Text>
          <Image
            style={styles.image}
            source={require('../assets/imgs/clouds1.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 500,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  dataText: {
    marginVertical: 5,
    fontSize: 17,
  },
  imageContainer: {
    width: '70%',
    alignItems: 'center',
    padding: 20,
    marginRight: 20,
  },
  image: {
    height: 120,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default CityWeatherScreen;
