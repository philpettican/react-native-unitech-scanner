import React, { useCallback } from 'react';

import { Button, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import useUnitechScanner from 'react-native-unitech-scanner';

export default function App() {
	const [barcode, setBarcode] = React.useState<string>();

	const onScan = useCallback((data) => {
		console.log('onScan', data);
		const { barcodeString } = data;
		setBarcode(barcodeString);
	}, []);

	const { startDecode, stopDecode } = useUnitechScanner(onScan, () => {});

	return (
		<SafeAreaView style={styles.container}>
			<Text>Barcode: {barcode}</Text>
			<Button
				title="Start Decode"
				onPress={() => {
					startDecode((result) => {
						console.log('startDecode', result);
					});
				}}
			/>
			<Button
				title="Stop Decode"
				onPress={() => {
					stopDecode((result) => {
						console.log('stopDecode', result);
					});
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	box: {
		width: 60,
		height: 60,
		marginVertical: 20,
	},
});
