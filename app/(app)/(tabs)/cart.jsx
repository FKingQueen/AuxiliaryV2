import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Cart() {
    const router = useRouter();
    return (
        <View className="flex-1 p-3">
            <View className="bg-white rounded shadow p-4 mb-3 h-52">
                <Text className="text-lg font-semibold">Welcome to the Cart Screen</Text>
            </View>
        </View>
    )
}