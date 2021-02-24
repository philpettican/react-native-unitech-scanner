import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import ScanManager from 'react-native-unitech-scanner';

export default function App() {
	const [events, setEvents] = useState<object[]>([]);
	const [openScannerEnabled, setOpenScannerEnabled] = useState(false);
	const [closeScannerEnabled, setCloseScannerEnabled] = useState(false);
	const [startDecodeEnabled, setStartDecodeEnabled] = useState(false);
	const [stopDecodeEnabled, setStopDecodeEnabled] = useState(false);
	const [triggerLockStateEnabled, setTriggerLockStateEnabled] = useState(
		false
	);
	const [lockTriggerEnabled, setLockTriggerEnabled] = useState(false);
	const [unlockTriggerEnabled, setUnlockTriggerEnabled] = useState(false);

	const appendToLog = (eventType: string, data: object) => {
		const eventEntry = {
			...data,
			eventType,
		};

		setEvents((previousEvents) => [eventEntry, ...previousEvents]);
	};

	useEffect(() => {
		const onScan = (data: object) => {
			appendToLog('onScan', data);
		};

		const listener = ScanManager.addEventListener(
			ScanManager.constants.events.SCANNER_BARCODE,
			onScan
		);

		return () => {
			listener.remove();
		};
	}, []);

	useEffect(() => {
		async function init() {
			const scannerState = await ScanManager.getScannerState();
			const triggerLockState = await ScanManager.getTriggerLockState();
			setOpenScannerEnabled(!scannerState);
			setCloseScannerEnabled(scannerState);
			setStartDecodeEnabled(scannerState);
			setStopDecodeEnabled(scannerState);
			setTriggerLockStateEnabled(scannerState);
			setLockTriggerEnabled(scannerState && !triggerLockState);
			setUnlockTriggerEnabled(scannerState && triggerLockState);
		}

		init();
	});

	const onGetScannerStatePress = async () => {
		const response = await ScanManager.getScannerState();
		appendToLog(ScanManager.getScannerState.name, { response });
	};

	const onOpenScannerPress = async () => {
		const response = await ScanManager.openScanner();
		appendToLog(ScanManager.openScanner.name, { response });
	};

	const onCloseScannerPress = async () => {
		const response = await ScanManager.closeScanner();
		appendToLog(ScanManager.closeScanner.name, { response });
	};

	const onStartDecodePress = async () => {
		const response = await ScanManager.startDecode();
		appendToLog(ScanManager.startDecode.name, { response });
	};

	const onStopDecodePress = async () => {
		const response = await ScanManager.stopDecode();
		appendToLog(ScanManager.stopDecode.name, { response });
	};

	const onGetTriggerLockStatePress = async () => {
		const response = await ScanManager.getTriggerLockState();
		appendToLog(ScanManager.getTriggerLockState.name, { response });
	};

	const onLockTriggerPress = async () => {
		const response = await ScanManager.lockTrigger();
		appendToLog(ScanManager.lockTrigger.name, { response });
	};

	const onUnlockTriggerPress = async () => {
		const response = await ScanManager.unlockTrigger();
		appendToLog(ScanManager.unlockTrigger.name, { response });
	};

	const renderItem = ({ item }: { item: any }) => {
		const { eventType, ...data } = item;
		return (
			<View style={styles.logItem}>
				<Text>Event type: {eventType}</Text>
				{<Text>Data: {JSON.stringify(data, null, 2)}</Text>}
			</View>
		);
	};

	const onClearLogPress = () => {
		setEvents([]);
	};

	const ItemSeparator = () => {
		return <View style={styles.itemSeparatorStyle} />;
	};

	const actions = [
		{
			title: 'Get Scanner State',
			onPress: onGetScannerStatePress,
		},
		{
			title: 'Open Scanner',
			onPress: onOpenScannerPress,
			disabled: !openScannerEnabled,
		},
		{
			title: 'Close Scanner',
			onPress: onCloseScannerPress,
			disabled: !closeScannerEnabled,
		},
		{
			title: 'Start Decode',
			onPress: onStartDecodePress,
			disabled: !startDecodeEnabled,
		},
		{
			title: 'Stop Decode',
			onPress: onStopDecodePress,
			disabled: !stopDecodeEnabled,
		},
		{
			title: 'Get Trigger Lock State',
			onPress: onGetTriggerLockStatePress,
			disabled: !triggerLockStateEnabled,
		},
		{
			title: 'Lock Trigger',
			onPress: onLockTriggerPress,
			disabled: !lockTriggerEnabled,
		},
		{
			title: 'Unlock Trigger',
			onPress: onUnlockTriggerPress,
			disabled: !unlockTriggerEnabled,
		},
	];

	return (
		<SafeAreaView style={styles.safeAreaView}>
			<Text style={styles.title}>Unitech Scanner Demo</Text>
			<ScrollView style={styles.container}>
				<View style={styles.actions}>
					<Text style={styles.heading}>Actions:</Text>
					{actions.map((action, index) => {
						const { disabled, title, onPress } = action;

						return (
							<TouchableOpacity
								key={String(index)}
								style={StyleSheet.flatten([
									styles.button,
									disabled && styles.buttonDisabled,
								])}
								onPress={onPress}
								disabled={disabled}
							>
								<Text style={styles.buttonLabel}>{title}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>
			<View style={styles.container}>
				<View style={styles.actions}>
					<TouchableOpacity
						style={StyleSheet.flatten([
							styles.button,
							!events?.length && styles.buttonDisabled,
						])}
						onPress={onClearLogPress}
						disabled={!events?.length}
					>
						<Text style={styles.buttonLabel}>Clear log</Text>
					</TouchableOpacity>
					<Text style={styles.heading}>
						Event log ({events?.length}):
					</Text>
					<FlatList
						data={events}
						keyExtractor={(_item, index) => String(index)}
						renderItem={renderItem}
						ItemSeparatorComponent={ItemSeparator}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
	},
	container: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 10,
		color: '#202020',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgrey',
	},
	button: {
		justifyContent: 'center',
		borderRadius: 5,
		borderColor: '#ddd',
		borderWidth: 1,
		backgroundColor: '#09589c',
		padding: 10,
	},
	buttonDisabled: {
		backgroundColor: 'lightgrey',
		color: 'black',
	},
	buttonLabel: {
		fontSize: 18,
		textAlign: 'center',
		color: 'white',
	},
	actions: {
		paddingTop: 10,
		padding: 10,
	},
	heading: {
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'left',
		color: '#202020',
		paddingVertical: 5,
	},
	itemSeparatorStyle: {
		height: 1,
		backgroundColor: 'lightgrey',
	},
	logItem: {
		paddingVertical: 5,
	},
});
