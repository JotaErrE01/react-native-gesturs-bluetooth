import { Text, TouchableOpacity, View } from 'react-native';
import { useBle } from '../hooks/useBle';

export const BleManager = () => {
  const { isScanning, startScan } = useBle();

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={startScan}
      >
        <Text>
          {
            isScanning ? 'Stop Scanning' : 'Start Scanning'
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
};
