# react-native-unitech-scanner

Unitech Scanner for EA510

\*Note: This package is still under beta version\*

## Installation

```sh
yarn add react-native-unitech-scanner
```

or

```sh
npm install react-native-unitech-scanner
```

## Usage

```js
import useUnitechScanner from 'react-native-unitech-scanner';

// ...

// Called when barcode is scanned
const onScan = useCallback((data) => {
	// Handle the barcode data
	const { barcode, length, type } = data;
	console.log('barcode', barcode);
	console.log('length', length);
	console.log('type', type);
}, []);

const {
	getScannerState,
	openScanner,
	closeScanner,
	startDecode,
	stopDecode,
	getTriggerLockState,
	lockTrigger,
	unlockTrigger,
} = useUnitechScanner(onScan);
```

## API:

| Method                                        | Return Type        | iOS | Android |
| --------------------------------------------- | ------------------ | --- | ------- |
| [getScannerState()](#getScannerState)         | `Promise<boolean>` | ❌  | ✅      |
| [openScanner()](#openScanner)                 | `Promise<boolean>` | ❌  | ✅      |
| [closeScanner()](#closeScanner)               | `Promise<boolean>` | ❌  | ✅      |
| [startDecode()](#startDecode)                 | `Promise<boolean>` | ❌  | ✅      |
| [stopDecode()](#stopDecode)                   | `Promise<boolean>` | ❌  | ✅      |
| [getTriggerLockState()](#getTriggerLockState) | `Promise<boolean>` | ❌  | ✅      |
| [lockTrigger()](#lockTrigger)                 | `Promise<boolean>` | ❌  | ✅      |
| [unlockTrigger()](#unlockTrigger)             | `Promise<boolean>` | ❌  | ✅      |

---

### getScannerState()

Get the scanner power states. Returns true if the scanner power on

#### Examples

```js
getScannerState().then((response) => {
	console.log(response);
});
```

### openScanner()

Turn on the power for the bar code reader. Returns false if failed, true if successful

#### Examples

```js
openScanner().then((response) => {
	console.log(response);
});
```

### closeScanner()

Turn off the power for the bar code reader. Returns false if failed, true if successful

#### Examples

```js
closeScanner().then((response) => {
	console.log(response);
});
```

### startDecode()

Call this method to start decoding. Returns true if the scanner and the trigger is already active

#### Examples

```js
startDecode().then((response) => {
	console.log(response);
});
```

### stopDecode()

This stops any data acquisition currently in progress. Returns true if stop successful

#### Examples

```js
stopDecode().then((response) => {
	console.log(response);
});
```

### getTriggerLockState()

Get the scan trigger status. Returns true if the scan trigger is already active

#### Examples

```js
getTriggerLockState().then((response) => {
	console.log(response);
});
```

### lockTrigger()

Set the scan trigger inactive (disable the scan button). Returns true if successful. Returns false if failed.

#### Examples

```js
lockTrigger().then((response) => {
	console.log(response);
});
```

### unlockTrigger()

Set the scan trigger active (enable the scan button). Returns true if successful. Returns false if failed.

#### Examples

```js
unlockTrigger().then((response) => {
	console.log(response);
});
```

## Mock a barcode scan

If you are developing an application for a Unitech scanner device but do not have the physical device, you can mock a barcode scan using the following:

```js
import { DeviceEventEmitter } from 'react-native';

//...

DeviceEventEmitter.emit('scanner-barcode', {
	barcode: '0123456789',
	length: 10,
	type: 11,
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
