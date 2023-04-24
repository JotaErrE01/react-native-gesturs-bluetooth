import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <div style="max-width: 400px; overflow: hidden">
      <h1 style="font-size: 30px; font-family: Helvetica Neue; font-weight: normal;">
        Hello Expo!
      </h1>
    </div>
  </body>
</html>
`;

export const PrintComponent = () => {
  const [selectedPrinter, setSelectedPrinter] = useState<Print.Printer>();

  useEffect(() => {
    console.log({Print});
    
    // Print.getPrintersAsync().then((printers) => {
    //   console.log('Available printers:', printers);
    //   if (printers.length) {
    //     setSelectedPrinter(printers[0]);
    //   }
    // });
  }, [selectedPrinter]);

  // const print = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   await Print.printAsync({
  //     html,
  //     printerUrl: selectedPrinter?.url, // iOS only
  //   });
  // };

  // const printToFile = async () => {
  //   // On iOS/android prints the given html. On web prints the HTML from the current page.
  //   const { uri } = await Print.printToFileAsync({ html });
  //   console.log('File has been saved to:', uri);
  //   await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  // };

  // const selectPrinter = async () => {
  //   const printer = await Print.selectPrinterAsync(); // iOS only
  //   setSelectedPrinter(printer);
  // };

  return (
    <View style={styles.container}>
      <Button title="Print" onPress={console.log} />
      {/* <View style={styles.spacer} />
      <Button title="Print to PDF file" onPress={printToFile} />
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title="Select printer" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  spacer: {
    height: 10,
  },
  printer: {
    textAlign: 'center',
  },
});
