import { useLayoutEffect } from 'react';
import {
	EventSubscription,
	NativeEventEmitter,
	NativeModules,
} from 'react-native';

const SUPPORTED_EVENTS = [
	'scanner-appeared',
	'scanner-disappeared',
	'scanner-connected',
	'scanner-disconnected',
];

type CallbackOpenScanner = (result: boolean) => void;
type CallbackCloseScanner = (result: boolean) => void;
type CallbackStartDecode = (result: boolean) => void;
type CallbackStopDecode = (result: boolean) => void;
type EventBarcode = {
	barcode: [];
	barcodeString: string;
	length: number;
	type: string;
};

type EventHandler = (event: string) => void;
type EventBarcodeHandler = (data: EventBarcode) => void;

const { UnitechScanner } = NativeModules;
const RNUnitechScanner = new NativeEventEmitter(UnitechScanner);

const openScanner = (callback: CallbackOpenScanner) => {
	UnitechScanner.openScanner((result: boolean) => {
		callback(result);
	});
};

const closeScanner = (callback: CallbackCloseScanner) => {
	UnitechScanner.closeScanner((result: boolean) => {
		callback(result);
	});
};

const startDecode = (callback: CallbackStartDecode) => {
	UnitechScanner.startDecode((result: boolean) => {
		callback(result);
	});
};

const stopDecode = (callback: CallbackStopDecode) => {
	UnitechScanner.stopDecode((result: boolean) => {
		callback(result);
	});
};

const useUnitechScanner = (
	onScan: EventBarcodeHandler,
	onEvent: EventHandler | undefined
) => {
	useLayoutEffect(() => {
		const handleBarcodeEvent = (data: EventBarcode) => {
			if (onScan) {
				onScan(data);
			}
		};

		const listeners: EventSubscription[] = [];
		listeners.push(
			RNUnitechScanner.addListener('scanner-barcode', handleBarcodeEvent)
		);

		if (onEvent) {
			SUPPORTED_EVENTS.forEach((event: string) => {
				listeners.push(
					RNUnitechScanner.addListener(event, (data) => {
						onEvent(event);
					})
				);
			});
		}

		return () => {
			listeners.forEach((listener) => {
				listener.remove();
			});
		};
	});

	return {
		openScanner,
		closeScanner,
		startDecode,
		stopDecode,
	};
};

export default useUnitechScanner;
