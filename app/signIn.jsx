import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { StatusBar } from "react-native-web";
import Loading from "../components/Loading";
import { useAuth } from '../context/authContext';

export default function SignIn() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleLogin = async () => {
        // Handle login logic here
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Please fill in all fields!");
            return;
        }

        setLoading(true);
        let response = await login(
            emailRef.current,
            passwordRef.current
        );
        setLoading(false);
        console.log("got result:", response);
        if (!response.success) {
            Alert.alert("Sign In Error:", response.msg);
        }

    };

    return (
        <View className="flex-1">
            <StatusBar style="dark" />
            <View
                style={{ paddingTop: hp(10), paddingHorizontal: wp(5) }}
                className="flex-1 gap-12"
            >
                <View className="items-center">
                    <Image
                        style={{ height: hp(25) }}
                        resizeMode="contain"
                        source={require("../assets/images/MMSU.png")}
                    />
                </View>

                <View className="items-center gap-10">
                    <Text
                        style={{ fontSize: hp(4) }}
                        className="text-black font-bold tracking-wider text-center text-neutral"
                    >
                        Sign In
                    </Text>
                    {/* Inputs */}
                    <View className="gap-4 w-full">
                        <View
                            style={{ height: hp(7) }}
                            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
                        >
                            <Octicons name="mail" size={24} color="gray" />
                            <TextInput
                                onChangeText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-neutral-700"
                                placeholder="Email Address"
                                placeholderTextColor={"gray"}
                            ></TextInput>
                        </View>
                        <View className="gap-3">
                            <View
                                style={{ height: hp(7) }}
                                className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
                            >
                                <Octicons name="mail" size={24} color="gray" />
                                <TextInput
                                    onChangeText={value => passwordRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className="flex-1 font-semibold text-neutral-700"
                                    placeholder="Password"
                                    placeholderTextColor={"gray"}
                                    secureTextEntry={true}
                                ></TextInput>
                            </View>
                            <Pressable onPress={() => router.push("/forgotPassword")}>
                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className="text-right text-neutral-600 font-semibold"
                                >
                                    Forgot Password?
                                </Text>
                            </Pressable>
                        </View>

                        <View >
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>

                                ) : (
                                    <TouchableOpacity onPress={handleLogin}>
                                        <View
                                            style={{ height: hp(7) }}
                                            className="bg-green-900 rounded-2xl items-center justify-center"
                                        >
                                            <Text
                                                style={{ fontSize: hp(2.7) }}
                                                className="text-white font-bold tracking-wider"
                                            >
                                                Sign In
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                        {/* Submit Button */}


                        {/* Sign up Text */}
                        <View className="flex-row justify-center gap-2">
                            <Text
                                style={{ fontSize: hp(1.7) }}
                                className="text-neutral-600 font-semibold"
                            >
                                Don't have an account?
                            </Text>
                            <Pressable onPress={() => router.push("/signUp")}>
                                <Text
                                    style={{ fontSize: hp(1.7) }}
                                    className="text-green-900 font-bold"
                                >
                                    Sign Up
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
