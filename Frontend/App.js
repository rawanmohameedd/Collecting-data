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

    
    const getTopFive = async (roomNum) => {
        try {
            const data = await WifiReborn.reScanAndLoadWifiList();
            data.sort((a, b) => {
                return a.level < b.level ? 1 : -1;
            });
            const slicedData = data.slice(0, 5);
    
            const accelroSensor = accelerometer.subscribe(({ x, y, z }) => {
                accelroSensor.unsubscribe();
                const total = Math.sqrt(x * x + y * y + z * z);
                setAccelerometerData(total);
            });
    
            const magnoSensor = magnetometer.subscribe(({ x, y, z }) => {
                magnoSensor.unsubscribe();
                const total = Math.sqrt(x * x + y * y + z * z);
                setMagnetometerData(total);
            });
    
            const dataWithRoomnum = {
                data: slicedData,
                accelerometerSensor: accelerometerData,
                magnetometerSensor: magnetometerData,
                roomNum,
            };
    
            console.log(dataWithRoomnum);
            return dataWithRoomnum;
        } catch (error) {
            console.error('Error fetching WiFi data:', error);
            throw error;
        }
    };
    

//fetch read request
const readValues = async (roomNum) => {
    try {
        const dataWithRoomnum = await getTopFive(roomNum);
        fetch("http://192.168.1.14:3000/read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                BSSID1: dataWithRoomnum.data[0].BSSID,
                BSSID2: dataWithRoomnum.data[1].BSSID,
                BSSID3: dataWithRoomnum.data[2].BSSID,
                BSSID4: dataWithRoomnum.data[3].BSSID,
                BSSID5: dataWithRoomnum.data[4].BSSID,

                RSSI1: dataWithRoomnum.data[0].level,
                RSSI2: dataWithRoomnum.data[1].level,
                RSSI3: dataWithRoomnum.data[2].level,
                RSSI4: dataWithRoomnum.data[3].level,
                RSSI5: dataWithRoomnum.data[4].level,

                Frequency1: dataWithRoomnum.data[0].frequency ,
                Frequency2: dataWithRoomnum.data[1].frequency ,
                Frequency3: dataWithRoomnum.data[2].frequency ,
                Frequency4: dataWithRoomnum.data[3].frequency ,
                Frequency5: dataWithRoomnum.data[4].frequency ,

                accelerometer: dataWithRoomnum.accelerometerSensor,
                magnetometer: dataWithRoomnum.magnetometerSensor,

                location: dataWithRoomnum.roomNum
            }),
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

    const room1 = () => readValues(1);
    const room2 = () => readValues(2);
    const room3 = () => readValues(3);
    const out = () => readValues(0);

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