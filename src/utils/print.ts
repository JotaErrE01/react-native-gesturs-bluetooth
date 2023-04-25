import { BluetoothEscposPrinter } from '@brooons/react-native-bluetooth-escpos-printer';

type Align = 'LEFT' | 'CENTER' | 'RIGHT';

export const printText = async (text: string, align?: Align, stroke: number = 0): Promise<boolean> => {
  let alination: number;
  switch (align) {
    case 'CENTER':
      alination = BluetoothEscposPrinter.ALIGN.CENTER;
      break;

    case 'RIGHT':
      alination = BluetoothEscposPrinter.ALIGN.RIGHT;
      break;

    case 'LEFT':
      alination = BluetoothEscposPrinter.ALIGN.LEFT;
      break;

    default:
      alination = BluetoothEscposPrinter.ALIGN.LEFT;
  }

  try {
    await BluetoothEscposPrinter.printerAlign(alination);
    // await BluetoothEscposPrinter.printerAlign(alination);
    const options = {
      encoding: 'Cp1254',
      codepage: 32,
      widthtimes: stroke,
    }
    await BluetoothEscposPrinter.printText(text, options);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const printColumn = async (data: string[][], width?: number, align?: Align, stroke: number = 0): Promise<boolean> => {
  // await BluetoothEscposPrinter.printColumn([12,12,12],
  //   [BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.LEFT,BluetoothEscposPrinter.ALIGN.RIGHT],
  //   ["SuboTotal",'','$ 800.00'],{});

  try {
    for (const values of data) {
      await BluetoothEscposPrinter.printColumn([30, 6],
        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
        values, {});
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
