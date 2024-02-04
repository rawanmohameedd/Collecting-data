import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const WifiStrengthSampler = () => {
  const [wifiStrength, setWifiStrength] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      NetInfo.fetch().then(state => {
        if (state.type === 'wifi') {
          setWifiStrength(state.details.strength);
        }
      });
    }, 5000); // Sample every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <Text>Wi-Fi Strength: {wifiStrength}</Text>
    </View>
  );
};

export default WifiStrengthSampler;