import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function QRScanner() {
    const router = useRouter();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    if (!permission) return <View />;

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text>Camera access is required</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <CameraView
            style={StyleSheet.absoluteFill}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={scanned ? undefined : ({ data }) => {
                setScanned(true);
                console.log('QR Data:', data);

                // go back after scan
                router.back();
            }}
        />
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
