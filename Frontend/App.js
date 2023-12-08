import React , {useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View, StyleSheet} from 'react-native';
import WifiReborn from 'react-native-wifi-reborn'
const WIFIDetails = () =>{

  const [currentSSID, onChangecurrentSSID] = useState([]);
  const [currentBSSID, onChangecurrentBSSID] = useState([]);
  const [currentRSSI, onChangecurrentRSSI] = useState([]);


  useEffect(()=> {
    permission();
    getConnectedWifi();
  }, []);

  const getConnectedWifi =()=>{
    WifiReborn.getCurrentWifiSSID().then(ssid=>onChangecurrentSSID(ssid)); 
    WifiReborn.getBSSID().then(bssid=> onChangecurrentBSSID(bssid));
    WifiReborn.getCurrentSignalStrength().then(rssi=> onChangecurrentRSSI(rssi));
  }
  const permission =  async ()=>{
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required  ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('granted')
      } else {
        console.log('not granted')
      }
    } 

    return(
      <View style={{flex: 1 , justifyContent:'center', alignItems:'center'}}>
          <Text>ssid: {currentSSID} </Text>
          <Text>Bssid: {currentBSSID}</Text>
          <Text>Rssi: {currentRSSI}</Text>
      </View>
    )
}
export default WIFIDetails

