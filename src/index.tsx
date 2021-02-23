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

type EventBarcode = {
	barcode: string;
	length: number;
	type: string;
};

type EventHandler = (event: string, data: object) => void;
type EventBarcodeHandler = (data: EventBarcode) => void;

const { UnitechScanner } = NativeModules;
const RNUnitechScanner = new NativeEventEmitter(UnitechScanner);

const getScannerState = async (): Promise<boolean> => {
	return await UnitechScanner.getScannerState();
};

const openScanner = async (): Promise<boolean> => {
	return await UnitechScanner.openScanner();
};

const closeScanner = async (): Promise<boolean> => {
	return await UnitechScanner.closeScanner();
};

const startDecode = async (): Promise<boolean> => {
	return await UnitechScanner.startDecode();
};

const stopDecode = async (): Promise<boolean> => {
	return await UnitechScanner.stopDecode();
};

const getTriggerLockState = async (): Promise<boolean> => {
	return await UnitechScanner.getTriggerLockState();
};

const lockTrigger = async (): Promise<boolean> => {
	return await UnitechScanner.lockTrigger();
};

const unlockTrigger = async (): Promise<boolean> => {
	return await UnitechScanner.unlockTrigger();
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
						onEvent(event, data);
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
		getScannerState,
		openScanner,
		closeScanner,
		startDecode,
		stopDecode,
		getTriggerLockState,
		lockTrigger,
		unlockTrigger,
	};
};

export default useUnitechScanner;
