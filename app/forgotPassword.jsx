import { Octicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/Loading";
import { useAuth } from '../context/authContext';


export default function ForgotPassword() {
    const { forgotPassword } = useAuth();
    const emailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleForgotPassword = async () => {
        if (!emailRef.current) {
            Alert.alert("Forgot Password", "Please enter your email address!");
            return;
        }

        setLoading(true);
        let result = await forgotPassword(emailRef.current);
        setLoading(false);

        if (result.success) {
            Alert.alert("Forgot Password", result.msg);
        } else {
            Alert.alert("Forgot Password Error:", result.msg);
        }
    };

    return (
        <View className="flex-1 justify-center gap-6 px-6">
            <View className="items-center">
                <Image
                    style={{ height: hp(25) }}
                    resizeMode="contain"
                    source={require("../assets/images/MMSU.png")}
                />
            </View>
            <View className="w-full flex-row justify-between items-center">
                <Text>Forgot Password</Text>
                <Pressable onPress={() => router.push("/signIn")}>
                    <Text
                        style={{ fontSize: hp(1.5) }}
                        className="text-right text-neutral-600 font-semibold"
                    >
                        Sign In?
                    </Text>
                </Pressable>
            </View>

            <View className="w-full gap-6">
                <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl">
                    <Octicons name="mail" size={24} color="gray" />
                    <TextInput
                        onChangeText={value => emailRef.current = value}
                        style={{ fontSize: hp(2) }}
                        className="flex-1 font-semibold text-neutral-700"
                        placeholder="Email Address"
                        placeholderTextColor={"gray"}
                    ></TextInput>
                </View>


                <View >
                    {
                        loading ? (
                            <View className="flex-row justify-center">
                                <Loading size={hp(6.5)} />
                            </View>

                        ) : (
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <View
                                    style={{ height: hp(7) }}
                                    className="bg-green-900 rounded-2xl items-center justify-center"
                                >
                                    <Text
                                        style={{ fontSize: hp(2.7) }}
                                        className="text-white font-bold tracking-wider"
                                    >
                                        Reset Password
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </View>
    )
}