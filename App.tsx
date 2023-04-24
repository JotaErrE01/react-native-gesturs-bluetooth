import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Draw2 from './src/Draw2';
// import { Bluetooth } from './src/Bluetooth';
// import Draw from './src/Draw';
// import AppTest from './AppTest';
// import { BleManager } from './src/BleManager';
import { FullApp } from './FullApp';
// import { BleManager } from './src/BleManager';
// import { PrintComponent } from './src/PrintComponent';
// import { PrintComponent2 } from './src/PrintComponent2';

export default function App() {
  return (
    <View
      style={styles.container}
    >
      {/* <Text>Hola mundo</Text> */}
      {/* <FullApp /> */}
      {/* <PrintComponent /> */}
      {/* <PrintComponent2 /> */}
      <FullApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
