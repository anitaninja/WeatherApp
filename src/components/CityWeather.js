import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';

const CityWeather = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            underlayColor="#f3f2fa"
            onPress={props.onSelect}>
            <View style={styles.cardContainer}>
                <View style={styles.dataContainer}>
                    <View>
                        <Text style={{ fontSize: 20, ...styles.textStyle }}>{props.city}</Text>
                        <Text style={{ fontSize: 15, textTransform: 'capitalize', ...styles.textStyle }}>{props.weather}</Text>
                    </View>
                    <Text style={{ fontSize: 30, ...styles.textStyle }}>{props.temprature}&deg;c</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomColor: '#f7f7f7',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    dataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        marginVertical: 5,
    }
});

export default CityWeather;