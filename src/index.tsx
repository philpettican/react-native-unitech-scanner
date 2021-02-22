import { NativeModules } from 'react-native';

type UnitechScannerType = {
  multiply(a: number, b: number): Promise<number>;
};

const { UnitechScanner } = NativeModules;

export default UnitechScanner as UnitechScannerType;
