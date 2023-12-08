import React from 'react'
import { Text, View } from 'react-native'

export default function SingleWifiRead({
    BSSID,
    SSID,
    frequency,
    level,
}) {
  return (
    <View style={{flex: 1 , justifyContent:'center', alignItems:'center'}}>
        <Text>Name:{SSID}, BSSID:{BSSID}, Level:{level}</Text>
    </View>
  )
}
