import React, { useEffect, useCallback, useState } from 'react';
import {
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	FlatList,
	ScrollView,
} from 'react-native';
import useUnitechScanner from 'react-native-unitech-scanner';

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

	const appendToLog = useCallback(
		(eventType, data) => {
			const eventEntry = {
				...data,
				eventType,
			};

			const previousEvents = events || [];
			const updatedEvents = [eventEntry, ...previousEvents];
			setEvents(updatedEvents);
		},
		[events]
	);

	const onScan = useCallback(
		(data) => {
			appendToLog('onScan', data);
		},
		[appendToLog]
	);

	const {
		getScannerState,
		openScanner,
		closeScanner,
		startDecode,
		stopDecode,
		getTriggerLockState,
		lockTrigger,
		unlockTrigger,
	} = useUnitechScanner(onScan, () => {});

	useEffect(() => {
		async function init() {
			const scannerState = await getScannerState();
			const triggerLockState = await getTriggerLockState();
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
		const result = await getScannerState();
		appendToLog(getScannerState.name, { result });
	};

	const onOpenScannerPress = async () => {
		const result = await openScanner();
		appendToLog(openScanner.name, { result });
	};

	const onCloseScannerPress = async () => {
		const result = await closeScanner();
		appendToLog(closeScanner.name, { result });
	};

	const onStartDecodePress = async () => {
		const result = await startDecode();
		appendToLog(startDecode.name, { result });
	};

	const onStopDecodePress = async () => {
		const result = await stopDecode();
		appendToLog(stopDecode.name, { result });
	};

	const onGetTriggerLockStatePress = async () => {
		const result = await getTriggerLockState();
		appendToLog(getTriggerLockState.name, { result });
	};

	const onLockTriggerPress = async () => {
		const result = await lockTrigger();
		appendToLog(lockTrigger.name, { result });
	};

	const onUnlockTriggerPress = async () => {
		const result = await unlockTrigger();
		appendToLog(unlockTrigger.name, { result });
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
