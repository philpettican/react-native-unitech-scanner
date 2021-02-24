import {
	EventSubscription,
	NativeEventEmitter,
	NativeModules,
} from 'react-native';

type EventBarcode = {
	barcode: string;
	length: number;
	type: string;
};

type EventHandler = (eventType: string, data?: object) => void;
type EventBarcodeHandler = (data: EventBarcode) => void;

const { UnitechScanner } = NativeModules;
const RNUnitechScanner = new NativeEventEmitter(UnitechScanner);

const eventListeners: EventSubscription[] = [];

export default class ScanManager {
	static constants = {
		events: {
			SCANNER_BARCODE: 'scanner-barcode',
		},
	};

	static async getScannerState(): Promise<boolean> {
		return await UnitechScanner.getScannerState();
	}

	static async openScanner(): Promise<boolean> {
		return await UnitechScanner.openScanner();
	}

	static async closeScanner(): Promise<boolean> {
		return await UnitechScanner.closeScanner();
	}

	static async startDecode(): Promise<boolean> {
		return await UnitechScanner.startDecode();
	}

	static async stopDecode(): Promise<boolean> {
		return await UnitechScanner.stopDecode();
	}

	static async getTriggerLockState(): Promise<boolean> {
		return await UnitechScanner.getTriggerLockState();
	}

	static async lockTrigger(): Promise<boolean> {
		return await UnitechScanner.lockTrigger();
	}

	static async unlockTrigger(): Promise<boolean> {
		return await UnitechScanner.unlockTrigger();
	}

	static addEventListener(eventType: string, handler: Function) {
		let listener;

		switch (eventType) {
			case ScanManager.constants.events.SCANNER_BARCODE:
				listener = RNUnitechScanner.addListener(
					eventType,
					(data: EventBarcodeHandler) => {
						handler(data);
					}
				);
				break;
			default:
				listener = RNUnitechScanner.addListener(
					eventType,
					(data: EventHandler) => {
						handler(data);
					}
				);
				break;
		}

		eventListeners.push(listener);
		return listener;
	}

	static removeEventListener(subscriptionId: number) {
		const listenerIndex = eventListeners.findIndex(
			(listener) => listener.key === subscriptionId
		);
		if (listenerIndex <= -1) {
			return;
		}

		const listener = eventListeners[listenerIndex];
		listener.remove();
		eventListeners.splice(listenerIndex, 1);
	}
}
