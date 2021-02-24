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
import ScanManager from 'react-native-unitech-scanner';

// ...

// Called when barcode is scanned
const onScan = (data) => {
	// Handle the barcode data
	const { barcode, length, type } = data;
	console.log('barcode', barcode);
	console.log('length', length);
	console.log('type', type);
};

useEffect(() => {
	// Subscribe to barcode scan event
	const listener = ScanManager.addEventListener(
		ScanManager.constants.events.SCANNER_BARCODE,
		onScan
	);

	// Make sure to unsubscribe from event when finished
	return () => {
		listener.remove();
		// or
		// ScanManager.removeEventListener(listener.key);
	};
}, []);
```

## API:

| Method                                        | Return Type            | iOS | Android |
| --------------------------------------------- | ---------------------- | --- | ------- |
| [addEventListener()](#addEventListener)       | `EmmitterSubscription` | ❌  | ✅      |
| [removeEventListener()](#removeEventListener) | `void`                 | ❌  | ✅      |
| [getScannerState()](#getScannerState)         | `Promise<boolean>`     | ❌  | ✅      |
| [openScanner()](#openScanner)                 | `Promise<boolean>`     | ❌  | ✅      |
| [closeScanner()](#closeScanner)               | `Promise<boolean>`     | ❌  | ✅      |
| [startDecode()](#startDecode)                 | `Promise<boolean>`     | ❌  | ✅      |
| [stopDecode()](#stopDecode)                   | `Promise<boolean>`     | ❌  | ✅      |
| [getTriggerLockState()](#getTriggerLockState) | `Promise<boolean>`     | ❌  | ✅      |
| [lockTrigger()](#lockTrigger)                 | `Promise<boolean>`     | ❌  | ✅      |
| [unlockTrigger()](#unlockTrigger)             | `Promise<boolean>`     | ❌  | ✅      |

---

### addEventListener(eventType, handler)

Attaches a listener to an event.

#### Examples

```js
ScanManager.addEventListener(
	ScanManager.constants.events.SCANNER_BARCODE,
	(data) => {
		console.log('eventData', data);
	}
);
```

### removeEventListener(subscriptionId)

Removes the event listener. Do this in componentWillUnmount to prevent memory leaks

#### Examples

```js
ScanManager.removeEventListener(subscriptionId);
```

### getScannerState()

Get the scanner power states. Returns true if the scanner power on

#### Examples

```js
ScanManager.getScannerState().then((response) => {
	console.log(response);
});
```

### openScanner()

Turn on the power for the bar code reader. Returns false if failed, true if successful

#### Examples

```js
ScanManager.openScanner().then((response) => {
	console.log(response);
});
```

### closeScanner()

Turn off the power for the bar code reader. Returns false if failed, true if successful

#### Examples

```js
ScanManager.closeScanner().then((response) => {
	console.log(response);
});
```

### startDecode()

Call this method to start decoding. Returns true if the scanner and the trigger is already active

#### Examples

```js
ScanManager.startDecode().then((response) => {
	console.log(response);
});
```

### stopDecode()

This stops any data acquisition currently in progress. Returns true if stop successful

#### Examples

```js
ScanManager.stopDecode().then((response) => {
	console.log(response);
});
```

### getTriggerLockState()

Get the scan trigger status. Returns true if the scan trigger is already active

#### Examples

```js
ScanManager.getTriggerLockState().then((response) => {
	console.log(response);
});
```

### lockTrigger()

Set the scan trigger inactive (disable the scan button). Returns true if successful. Returns false if failed.

#### Examples

```js
ScanManager.lockTrigger().then((response) => {
	console.log(response);
});
```

### unlockTrigger()

Set the scan trigger active (enable the scan button). Returns true if successful. Returns false if failed.

#### Examples

```js
ScanManager.unlockTrigger().then((response) => {
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
