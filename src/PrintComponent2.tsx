import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import { useEffect, useMemo, useState } from 'react';
import { Text } from 'react-native';


const options = {
  width: 40,
  height: 30,
  gap: 20,
  direction: BluetoothTscPrinter.DIRECTION.FORWARD,
  reference: [0, 0],
  tear: BluetoothTscPrinter.TEAR.ON,
  sound: 0,
  text: [
    {
      text: 'I am a testing txt',
      x: 20,
      y: 0,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
    {
      text: '你在说什么呢?',
      x: 20,
      y: 50,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
  ],
  qrcode: [
    {
      x: 20,
      y: 96,
      level: BluetoothTscPrinter.EEC.LEVEL_L,
      width: 3,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: 'show me the money',
    },
  ],
  barcode: [
    {
      x: 120,
      y: 96,
      type: BluetoothTscPrinter.BARCODETYPE.CODE128,
      height: 40,
      readable: 1,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      code: '1234567890',
    },
  ],
  // image: [
  //   {
  //     x: 160,
  //     y: 160,
  //     mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,
  //     width: 60,
  //     image: base64Image,
  //   },
  // ],
};

export const PrintComponent2 = () => {
  // const [print, setPrint] = useState(null);
  // const [devices, setDevices] = useState(null);
  // const [connected, setConnected] = useState(false);
  // const [connecting, setConnecting] = useState(false);

  // const isBluetoothEnabled = useMemo(async () => await BluetoothManager.checkBluetoothEnabled(), []);

  // // useEffect(() => {
  // //   const getDevices = async () =>  await BluetoothManager.enableBluetooth();
  // //   getDevices().then(console.log).catch(error => console.log('error', error));
  // // }, []);

  // useEffect(() => {
  //   DeviceEventEmitter.addListener(
  //     BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED.toString(), (response) => {
  //       console.log(response);
  //       // response.devices would returns the paired devices array in JSON string.
  //     }
  //   );

  //   DeviceEventEmitter.addListener(
  //     BluetoothManager.EVENT_DEVICE_FOUND.toString(), (response) => {
  //       console.log(response);
  //       // response.devices would returns the found device object in JSON string.
  //     }
  //   );
  // }, []);
  

  // const connect = async (device: any) => {
  //   setConnecting(true);
  //   const connected = await BluetoothManager.connect(device.id);
  //   setConnecting(false);
  //   // setConnected(connected);
  // };


  return (
    <>
      <Text>hola</Text>
    </>
  )
};
