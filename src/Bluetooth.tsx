import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
  Platform,
  NativeModules,
  useColorScheme,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import * as IntentLauncher from 'expo-intent-launcher';

export const Bluetooth = () => {

  const handlebluetooth = async () => {
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    // );

    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.INTERNET,
    // );

    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH,
    // );

    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
    // );

    const res = await IntentLauncher.startActivityAsync(
      IntentLauncher.ActivityAction.BLUETOOTH_SETTINGS,
    );
    console.log({ res });


    // console.log({BleManager})
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 30,
        justifyContent: 'center'
      }}
    >
      <View>
        <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}
          onPress={handlebluetooth}
        >
          <Text style={styles.buttonTextStyle}>Scan Bluetooth Devices </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

// const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // mainBody: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   height: windowHeight,
  // },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    // height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 20,
  },
});
