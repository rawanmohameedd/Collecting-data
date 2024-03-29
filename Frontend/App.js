import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View, StyleSheet, Pressable, Alert } from 'react-native';
import bssidMap from './BSSIDs';
import WifiReborn from 'react-native-wifi-reborn';
// import { magnetometer } from 'react-native-sensors';
// import axios from 'axios'

const DataDetails = () => {
  // const [magnetometerData, setMagnetometerData] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [stopButtonPressed, setStopButtonPressed] = useState(false);
  let Readings =0
  useEffect(() => {
    permission();

    // Subscribe to magnetometer sensor in useEffect
    // let magnoSensor = null;
    // if (magnetometer) {
    //   magnoSensor = magnetometer.subscribe(({ x, y, z }) => {
    //     const total = Math.sqrt(x * x + y * y + z * z);
    //     setMagnetometerData(total);
    //   });
    // }

    // Unsubscribe from magnetometer sensor on component unmount
    // return () => {
    //   if (magnoSensor) {
    //     magnoSensor.unsubscribe();
    //   }
    // };
  }, []);

  const stopReading = () => {
    clearInterval(intervalId);
    setStopButtonPressed(true);
    Readings=0
    Alert.alert('Alert', 'Collecting stops!');
  };

  const fetchReading = async (roomNum,indoor) => {
    console.log(0)

    const data = await WifiReborn.reScanAndLoadWifiList();

    console.log(1)

    const filteredDataWithStrength = {};
    Object.keys(bssidMap).forEach((bssid) => {
      filteredDataWithStrength[bssid] = bssidMap[bssid] ;
    });
    // console.log('data: '+ data)

    //update strength values for scanned BSSIDs
    data.forEach((wifi) => {
      const bssid = wifi.BSSID;
      if (filteredDataWithStrength[bssid]) {
        filteredDataWithStrength[bssid]= wifi.level;
      }
    });
    Readings=Readings+1
    console.log(Readings)
    // console.log(3)

    return {
      data: filteredDataWithStrength,
      // magnetometerSensor: magnetometerData,
      roomNum,
      indoor
    };
  };

  const getReading = async (roomNum,indoor) => {
    try {
      // Display an alert to confirm the start of collecting
      Alert.alert(
        'Confirmation',
        'Are you sure you want to get the reading for this room?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              // Check if magnetometer sensor is available
              // if (magnetometer) {
              //   const magnoSensor = await magnetometer.subscribe(({ x, y, z }) => {
              //     const total = Math.sqrt(x * x + y * y + z * z);
              //     setMagnetometerData(total);
              //     magnoSensor.unsubscribe();
              //   });
              // } else {
              //   console.warn('Magnetometer sensor is not available.');
              // }
              
              // User pressed "Yes," start the interval to call getReading every 2 seconds
              const id = setInterval(async () => {
                try {
                  const dataWithRoomnum = await fetchReading(roomNum,indoor);
                  
                  //fetch read request
                  fetch("http://192.168.1.2:3000/read", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ dataWithRoomnum }),
                  })
                  .catch(error => {
                    console.error('Error making POST request:', error);
                  });

                  console.log(dataWithRoomnum);

                } catch (error) {
                  console.error('Error fetching WiFi data:', error);
                }
              }, 30100);

              // Save the intervalId to clear the interval later
              setIntervalId(id);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error fetching WiFi data:', error);
      throw error;
    }
  };

  const room1in = () => getReading(1,1);
  const room2in = () => getReading(2,1);
  const room3in = () => getReading(3,1);

  const room1out = () => getReading(1,0);
  const room2out = () => getReading(2,0);
  const room3out = () => getReading(3,0);
  const out = () => getReading(0,0);

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
      <View style={Styles.row}>
        <Pressable style={Styles.button} onPress={room1in}>
          <Text style={{color:'black'}}>Room1in</Text>
        </Pressable>
        <Pressable style={Styles.button} onPress={room1out}>
          <Text style={{color:'black'}}>Room1out</Text>
        </Pressable>
      </View>
      <View style={Styles.row}>
        <Pressable style={Styles.button} onPress={room2in}>
          <Text style={{color:'black'}}>Room2in</Text>
        </Pressable>
        <Pressable style={Styles.button} onPress={room2out}>
          <Text style={{color:'black'}}>Room2out</Text>
        </Pressable>
      </View>
      <View style={Styles.row}>
        <Pressable style={Styles.button} onPress={room3in}>
          <Text style={{color:'black'}}>Room3in</Text>
        </Pressable>
        <Pressable style={Styles.button} onPress={room3out}>
          <Text style={{color:'black'}}>Room3out</Text>
        </Pressable>
      </View>
      <View style={Styles.row}>
        <Pressable style={Styles.button} onPress={out}>
          <Text  style={{color:'black'}}>Out</Text>
        </Pressable>
      </View>
      <View style={Styles.row}>
        <Pressable style={Styles.button} onPress={stopReading}>
          <Text style={{color:'black'}}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  button: {
    color:'black',
    margin: 20,
    padding: 20,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default DataDetails;