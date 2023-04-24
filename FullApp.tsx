import React, { useState, useEffect, useMemo } from 'react';
import { BluetoothManager, BluetoothTscPrinter, BluetoothEscposPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
// import EscPosPrinter, { getPrinterSeriesByName } from 'react-native-esc-pos-printer';

import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const options: any = {
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
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
      yscal: BluetoothTscPrinter.FONTMUL.MUL_1,
    },
    {
      text: '你在说什么呢?',
      x: 20,
      y: 50,
      fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
      rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
      xscal: BluetoothTscPrinter.FONTMUL.MUL_1,
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

const MAC = '04:7F:0E:4B:89:D0';

export const FullApp = () => {
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connected, setConnected] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);

  // console.log({bluetoothDevices});

  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });
    // start bluetooth manager
    BleManager.start({ showAlert: false }).then(() => {
      console.log('BLE Manager initialized');
    });
    let stopListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan is stopped');
        // handleGetConnectedDevices();
      },
    );

    BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', peripheral => {
      if (!peripheral.name) return;
      peripherals.set(peripheral.id, peripheral);
      setBluetoothDevices((Array.from(peripherals.values()) as any));
    });

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
    return () => {
      stopListener.remove();
    };
  }, []);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 10, false)
        .then(() => {
          setIsScanning(true);
        })
        .catch(error => {
          console.error(error);
        });

      // BleManager.connect
    }
  };

  // const handleGetConnectedDevices = () => {
  //   BleManager.getConnectedPeripherals().then(results => {
  //     // console.log({results})
  //     if (results.length == 0) {
  //       console.log('No connected bluetooth devices');
  //     } else {
  //       for (let i = 0; i < results.length; i++) {
  //         let peripheral: any = results[i];
  //         peripheral.connected = true;
  //         peripherals.set(peripheral.id, peripheral);
  //         setConnected(true);
  //         setBluetoothDevices(Array.from(peripherals.values()));
  //       }
  //     }
  //   });
  // };

  const connectToPeripheral = async (peripheral: any) => {
    if (peripheral.connected) {
      BleManager.disconnect(peripheral.id).then(() => {
        peripheral.connected = false;
        setConnected(false);
        alert(`Disconnected from ${peripheral.name}`);
      });
    } else {
      // console.log({peripheral})
      try {
        console.log('Connecting to ' + peripheral.name);
        console.log('ID: ' + peripheral.id);
        
        await BluetoothManager.connect(peripheral.id);

        // await BleManager.connect(peripheral.id);
        // const peripheralData = await BleManager.retrieveServices(peripheral.id);
        // console.info({peripheralData: JSON.stringify(peripheralData, null, 2)})
        // peripheral.connected = true;

        // console.log('Connected to ' + { peripheral });
        // emparejarar
        // await BleManager.createBond(peripheral.id)

        // peripherals.set(peripheral.id, peripheral);
        // setConnected(true);
        // setBluetoothDevices(Array.from(peripherals.values()));
        // alert(`Connected to ${peripheral.name}`);

        // Envía los datos de impresión
        // BleManager.write(peripheralData.id, peripheralData.serviceUUIDs![0], peripheralData.characteristics![0].characteristic, [1, 2, 3], 1024)
        //   .then(() => {
        //     console.log('Datos de impresión enviados');

        //     // Desconéctate de la impresora
        //     BleManager.disconnect(peripheralData.id)
        //       .then(() => {
        //         console.log('Desconectado de la impresora Rongta');
        //       })
        //       .catch(error => {
        //         console.log(error);
        //       });
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });


        // if (!peripheralData.characteristics) return;
        // console.log('services', peripheralData.services);
        // console.log('characteristics', peripheralData.characteristics);
        // const writeCharacteristic = peripheralData.characteristics.find(
        //   (characteristic: any) =>
        //     characteristic.service === '49535343-fe7d-4ae5-8fa9-9fafd205e455' &&
        //     characteristic.characteristic === '49535343-1e4d-4bd9-ba61-23c647249616',
        // );
        // console.log('writeCharacteristic', writeCharacteristic);

        // if (writeCharacteristic) {
        //   console.log('💩💩💩💩💩💩💩')
        //   console.log('💩💩💩💩💩💩💩')
        // const writeResponse = await BleManager.write(
        //   peripheral.id,
        //   writeCharacteristic.service,
        //   writeCharacteristic.characteristic,
        //   [0x1b, 0x40],
        // );
        // console.log('writeResponse', writeResponse);

        // const readResponse = await BleManager.read(
        //   peripheral.id,
        //   writeCharacteristic.service,
        //   writeCharacteristic.characteristic,
        // );

        // set pos print commands
        // await BluetoothEscposPrinter.printerInit();
        // BluetoothEscposPrinter.printColumn(columnWidths, columnAligns, columnTexts, options)
        // await BluetoothEscposPrinter.setBlob(0);
        // await BluetoothEscposPrinter.setBlob(1);

        // print pos printer
        // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        // await BluetoothEscposPrinter.printText('Hello World', {
        //   encoding: 'GBK',
        //   codepage: 0,
        //   widthtimes: 0,
        //   heigthtimes: 0,
        //   fonttype: 1,
        // });
        // BluetoothEscposPrinter.printText('你好，世界', {
        //   encoding: 'GBK',
        //   codepage: 0,
        //   widthtimes: 0,
        //   heigthtimes: 0,
        //   fonttype: 1,
        // });
        // const config = {
        //   width: 48,
        //   codepage: 0,
        //   font: 'B',
        //   mode: 0
        // };
        // BluetoothEscposPrinter.printText('¡Hola, mundo!\n', {})
        //   .then(() => console.log('Texto impreso'))
        //   .catch((error) => console.error(error));
        // }
      } catch (error) {
        console.error(error);
      }

      // BleManager.connect(peripheral.id)
      //   .then(() => {
      //     console.log({peripherals})

      //     let peripheralResponse = peripherals.get(peripheral.id);

      //     console.log({peripheralResponse})

      //     if (peripheralResponse) {
      //       peripheralResponse.connected = true;
      //       peripherals.set(peripheral.id, peripheralResponse);
      //       setConnected(true);
      //       setBluetoothDevices(Array.from(peripherals.values()));
      //     }
      //     alert('Connected to ' + peripheral.name);
      //   })
      //   .catch(error => console.log(error));
      // /* Read current RSSI value */
      // setTimeout(() => {
      //   BleManager.retrieveServices(peripheral.id).then(peripheralData => {
      //     console.log('Peripheral services:', peripheralData);
      //   });
      // }, 900);
    }
  };
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // render list of bluetooth devices
  const RenderItem = ({ peripheral }: any) => {
    const color = peripheral.connected ? 'green' : '#fff';
    return (
      <>
        <Text
          style={{
            fontSize: 20,
            marginLeft: 10,
            marginBottom: 5,
            color: isDarkMode ? Colors.white : Colors.black,
          }}>
          Nearby Devices:
        </Text>
        <TouchableOpacity onPress={() => connectToPeripheral(peripheral)}>
          <View
            style={{
              backgroundColor: color,
              borderRadius: 5,
              paddingVertical: 5,
              marginHorizontal: 10,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                textTransform: 'capitalize',
                color: connected ? Colors.white : Colors.black,
              }}>
              {peripheral.name}
            </Text>
            <View
              style={{
                backgroundColor: color,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: connected ? Colors.white : Colors.black,
                }}>
                RSSI: {peripheral.rssi}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: connected ? Colors.white : Colors.black,
                }}>
                ID: {peripheral.id}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const isEnabled = useMemo(async () => await BluetoothManager.checkBluetoothEnabled(), []);

  console.log({ isEnabled });

  // función para imprimir en la impresora POS
  // async function imprimirEnImpresoraPOS(textoDeImpresion: string = 'Hola Mundo!') {
  //   // Comandos de impresión
  //   const comandosDeImpresion = [
  //     // Comando para centrar el texto
  //     '\x1B\x61\x01',
  //     // Comando para imprimir texto
  //     textoDeImpresion,
  //     // Comando para cortar el papel
  //     '\x1B\x69',
  //   ].join('');

  //   try {
  //     // Obtener la lista de dispositivos Bluetooth emparejados
  //     const dispositivosEmparejados = await BluetoothSerial.list();

  //     // Filtrar la lista para encontrar el dispositivo de la impresora POS
  //     const impresoraPOS = dispositivosEmparejados.find(dispositivo => dispositivo.name === 'Nombre de la impresora');

  //     if(!impresoraPOS) throw new Error('No se encontró la impresora POS');

  //     // Conectarse al dispositivo Bluetooth de la impresora
  //     await BluetoothSerial.connect(impresoraPOS.id);

  //     // Enviar los comandos de impresión a la impresora
  //     await BluetoothSerial.write(comandosDeImpresion);

  //     // Desconectar el dispositivo Bluetooth de la impresora
  //     await BluetoothSerial.disconnect();
  //   } catch (error) {
  //     console.log('Error al imprimir en la impresora: ', error);
  //   }
  // }

  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                color: isDarkMode ? Colors.white : Colors.black,
              }}>
              React Native BLE Manager Tutorial
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}>
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => {
              BleManager.getConnectedPeripherals([]).then(results => {
                if (results.length === 0) {
                  alert('No connected peripherals');
                }
                console.log({ results });
                console.log('Connected peripherals: ' + JSON.stringify(results));
                // setBluetoothDevices(results);
              });
            }}>
            <Text style={styles.buttonTextStyle}>
              'Get Connected Devices'
            </Text>
          </TouchableOpacity>
        </View>
        {/* list of scanned bluetooth devices */}
        {bluetoothDevices.map((device: any) => (
          <View key={device.id}>
            <RenderItem peripheral={device} />
          </View>
        ))}

        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={async () => {
            try {
              // const manager = BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED
              // const manager = BluetoothEscposPrinter.BluetoothManager;


              // Comandos de impresión
              // const comandosDeImpresion = [
              //   // Comando para centrar el texto
              //   '\x1B\x61\x01',
              //   // Comando para imprimir texto
              //   'Hola Mundo!',
              //   // Comando para cortar el papel
              //   '\x1B\x69',
              // ].join('');

              // // usar BluetoothTscPrinter para imprimir en impresora POS
              // const options: any = {
              //   text: 'Hello World!',
              //   width: 100,
              //   height: 100,
              //   textSize: 1,
              //   encoding: 'GBK',
              //   codepage: 0,
              //   fonttype: 1,
              // };

              // await BluetoothTscPrinter.printLabel(options);
              // await BluetoothEscposPrinter.printerAlign(
              //   BluetoothEscposPrinter.ALIGN.CENTER,
              // );

              // await BluetoothEscposPrinter.printText('Hello World!\n', {
              //   encoding: 'GBK',
              //   codepage: 0,
              //   widthtimes: 0,
              //   heigthtimes: 0,
              //   fonttype: 1,
              // });
              // BluetoothEscposPrinter
              // await BluetoothEscposPrinter.printerAlign(
              //   BluetoothEscposPrinter.ALIGN.LEFT,
              // );

              // await BluetoothEscposPrinter.printText('Hello World!\n', {
              //   encoding: 'GBK',
              //   codepage: 0,
              //   widthtimes: 0,
              //   heigthtimes: 0,
              //   fonttype: 1,
              // });

              // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              // await BluetoothEscposPrinter.setBlob(0);
              // await BluetoothEscposPrinter.printText("广州俊烨\n\r", {
              //   encoding: 'GBK',
              //   codepage: 0,
              //   widthtimes: 3,
              //   heigthtimes: 3,
              //   fonttype: 1,
              // });
              // const printers = await EscPosPrinter.discover();
              // console.log({printers})
              // const manager = new BluetoothManager();
              // await manager.connect(direccionMAC);
              // Crea un objeto de comandos de impresión
              const printData = `Bienvenido a nuestra tienda\nArtículo 1       10.00 €\nArtículo 2       20.00 €\nTotal        30.00 €\n-------------------------`;

              // Envía los comandos de impresión a la impresora POS
              BluetoothEscposPrinter.printText(printData, {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
              })
                .then(() => {
                  console.log('Ticket impreso correctamente');
                })
                .catch((error) => {
                  console.log('Error al imprimir ticket:', error);
                });
            } catch (error) {
              console.log({ error })
            }
          }}
        >
          <Text>Print</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
// export default App;