import React , {useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View, StyleSheet} from 'react-native';
import WifiReborn from 'react-native-wifi-reborn'
import SingleWifiRead from './Components/SingleWifiRead';

const WIFIDetails = () =>{

  const [wifiList , onChangewifiList]  = useState([]);
  const [currentSSID, onChangecurrentSSID] = useState([]);
  const [currentBSSID, onChangecurrentBSSID] = useState([]);
  const [currentRSSI, onChangecurrentRSSI] = useState([]);


  useEffect(()=> {
    permission();
    getConnectedWifi();
    avaliableWIFI();
  }, []);

  const getConnectedWifi =()=>{
    WifiReborn.getCurrentWifiSSID().then(ssid=>onChangecurrentSSID(ssid)); 
    WifiReborn.getBSSID().then(bssid=> onChangecurrentBSSID(bssid));
    WifiReborn.getCurrentSignalStrength().then(rssi=> onChangecurrentRSSI(rssi));
  }

  const avaliableWIFI =()=>{
    WifiReborn.loadWifiList().then((data)=>{
      onChangewifiList(data)
    })
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
    const anas = [1, 2, 3]
    const rawan = anas.map((num) => {
      return num * 2
    })
    return(
      <View style={{flex: 1 , justifyContent:'center', alignItems:'center'}}>
          {wifiList.map((singleRead) => {
              return <SingleWifiRead SSID = {singleRead.SSID} BSSID={singleRead.BSSID} level={singleRead.level} frequency={singleRead.frequency} />
          })}
      </View>
    )
}
export default WIFIDetails

