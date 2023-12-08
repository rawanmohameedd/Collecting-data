import React , {useEffect, useState } from 'react';
import { PermissionsAndroid, Text, View, StyleSheet, Pressable} from 'react-native';
import WifiReborn, { loadWifiList } from 'react-native-wifi-reborn'
import SingleWifiRead from './Components/SingleWifiRead';

const WIFIDetails = () =>{

  const [wifiList , onChangewifiList]  = useState([]);
  const [currentSSID, onChangecurrentSSID] = useState([]);
  const [currentBSSID, onChangecurrentBSSID] = useState([]);
  const [currentRSSI, onChangecurrentRSSI] = useState([]);


  useEffect(()=> {
    permission();
    getConnectedWifi();
    room1();
    room2();

  }, []);

  const getConnectedWifi =()=>{
    WifiReborn.getCurrentWifiSSID().then(ssid=>onChangecurrentSSID(ssid)); 
    WifiReborn.getBSSID().then(bssid=> onChangecurrentBSSID(bssid));
    WifiReborn.getCurrentSignalStrength().then(rssi=> onChangecurrentRSSI(rssi));
  }

  const getTopFive =(roomNum)=>{
    WifiReborn.reScanAndLoadWifiList().then((data)=>{
      /*sort by level*/
      data.sort((a,b)=>{
        return a.level < b.level ? 1 : -1
      })
      data = data.slice(0,3)

      let dataWithRoomnum= {
        data,
        roomNum
      }
      console.log(dataWithRoomnum)
    //request 
    })
  }

  const room1 = ()=> getTopFive(1)
  const room2 = ()=> getTopFive(2)
  const room3 = ()=> getTopFive(3)
  const out = ()=> getTopFive(0)

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
       // console.log('granted')
      } else {
        console.log('not granted')
      }
    } 

    return(
      <View style={{flex: 1 , justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
      <Pressable style={{margin:20}} 
      onPress={room1}> 
      <Text>Room1</Text> 
      </Pressable>

      <Pressable style={{margin:20}}
      onPress={room2}>  
      <Text>Room2</Text> 
      </Pressable>
      
      <Pressable style={{margin:20}}
      onPress={room3}> 
      <Text>Room3</Text> 
      </Pressable>
      
      <Pressable style={{margin:20}}
      onPress={out}> 
      <Text>Out</Text> 
      </Pressable>
      
      </View>
    )
}
export default WIFIDetails


