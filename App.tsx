import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import Draw2 from './src/Draw2';
import { Bluetooth } from './src/Bluetooth';
// import Draw from './src/Draw';

export default function App() {
  return (
    <Bluetooth />
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
