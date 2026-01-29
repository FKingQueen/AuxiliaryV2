import { Stack } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="qrScanner"
                    options={({ navigation }) => ({
                        title: "Scan QR Code",
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginLeft: 15, flexDirection: 'row', alignItems: 'center' }}
                            >
                                <Text style={{ marginLeft: 5, fontSize: 16, color: '#000' }}>Back</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="modal"
                    options={{
                        presentation: 'transparentModal',
                        headerShown: false
                    }}
                />
            </Stack>
        </GestureHandlerRootView>
    )
}