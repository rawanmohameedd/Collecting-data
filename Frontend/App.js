import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View, StyleSheet, Pressable } from 'react-native';
import WifiReborn from 'react-native-wifi-reborn';
import { accelerometer, magnetometer } from 'react-native-sensors';

const DataDetails = () => {
    const [accelerometerData, setAccelerometerData] = useState(null);
    const [magnetometerData, setMagnetometerData] = useState(null);
    useEffect(() => {
    permission();
    }, []);

    const getTopFive = (roomNum) => {
    WifiReborn.reScanAndLoadWifiList().then((data) => {
        data.sort((a, b) => {
        return a.level < b.level ? 1 : -1;
        });
        data = data.slice(0, 5);

        const accelroSensor = accelerometer.subscribe(({ x, y, z, timestamp }) => {
        console.log('accelerometerSensor:', x, y, z, timestamp);
        accelroSensor.unsubscribe();
        setAccelerometerData({ x, y, z, timestamp });
        });

        const magnoSensor = magnetometer.subscribe(({ x, y, z, timestamp }) => {
        console.log('magnetometerSensor:', x, y, z, timestamp);
        magnoSensor.unsubscribe();
        setMagnetometerData({ x, y, z, timestamp });
        });

        let dataWithRoomnum = {
        data,
        accelerometerSensor: accelerometerData,
        magnetometerSensor: magnetometerData,
        roomNum,
        };
        console.log(dataWithRoomnum);
    });
    };

    const room1 = () => getTopFive(1);
    const room2 = () => getTopFive(2);
    const room3 = () => getTopFive(3);
    const out = () => getTopFive(0);

    const permission = async () => {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Location permission is required for WiFi connections',
        message: 'This app needs location permission as this is required to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Permission granted
    } else {
        console.log('Permission not granted');
    }
    };

    return (
    <View style={Styles.container}>
        <Pressable style={Styles.button} onPress={room1}>
        <Text>Room1</Text>
        </Pressable>

        <Pressable style={Styles.button} onPress={room2}>
        <Text>Room2</Text>
        </Pressable>

        <Pressable style={Styles.button} onPress={room3}>
        <Text>Room3</Text>
        </Pressable>

        <Pressable style={Styles.button} onPress={out}>
        <Text>Out</Text>
        </Pressable>
    </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        borderRadius: 5,
        margin: 20,
    },
});

export default DataDetails;