import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfoInstance } from "@react-native-community/netinfo";
export default function App() {
  const [wifiInfo, setWifiInfo] = useState('');
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      NetInfo.fetch().then((state) => {
        console.log(state);
        setWifiInfo(`Connection Type: ${state.type}

IsConnected: ${state.isConnected}

BSSID: ${state.details.bssid}

RSSI: ${state.details.strength} dBm

SSID: ${state.details.ssid}`);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ padding: 75}}>
      <Text style={{fontSize: 25, fontWeight: 'bold' }}>{wifiInfo}</Text>
    </View>
  );
}