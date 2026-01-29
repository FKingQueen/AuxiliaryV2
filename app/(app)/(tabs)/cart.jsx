import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import {
    heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default function Cart() {
    const router = useRouter();
    return (
        <View>
            <Pressable onPress={() => router.push("/home")}>
                <Text
                    style={{ fontSize: hp(1.5) }}
                    className="text-right text-neutral-600 font-semibold"
                >
                    Go back home
                </Text>
            </Pressable>
        </View>
    )
}