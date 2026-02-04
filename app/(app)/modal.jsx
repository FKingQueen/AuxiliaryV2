import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loading from "../../components/Loading";
import { useAuth } from '../../context/authContext';

export default function modal() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { changeAuxiliary } = useAuth();

    const handleChangeAuxialiary = async (id) => {

        console.log('ID: ', id);
        setLoading(true);
        await changeAuxiliary(id)
        setLoading(false);

        router.back();
    };
    return (
        <View className="flex-1">

            <Pressable
                className="flex-1 w-full justify-center items-center bg-gray-950/50"
                onPress={() => router.back()}
            >
                {/* 👇 PREVENT CLOSE WHEN CLICKING INSIDE */}
                <Pressable
                    className="w-4/5 p-4 bg-white rounded-lg border border-gray-300"
                    onPress={() => { }}
                >
                    {
                        loading ? (
                            <View className="flex-1 items-center justify-center gap-5 w-full border-b border-gray-300/50 bg-opacity-50 pb-5">
                                <Text className="text-lg font-semibold text-center">
                                    Changing Auxiliary...
                                </Text>
                                <Loading size={hp(6.5)} />
                            </View>

                        ) : (

                            <View className="justify-center items-center gap-10 border-b border-gray-300 pb-5 w-full">
                                <View>
                                    <Text className="text-lg font-semibold text-center">
                                        Available Auxiliary's
                                    </Text>
                                    <Text className="text-center text-gray-600">
                                        Select your Auxiliary
                                    </Text>
                                </View>
                                <View className="flex-row justify-center gap-10 items-center">
                                    <Pressable onPress={() => { handleChangeAuxialiary('ADMIN') }} className="justify-center items-center gap-2">
                                        <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                                        <Text>ADMIN</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { handleChangeAuxialiary('CAFSD') }} className="justify-center items-center gap-2">
                                        <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                                        <Text>CAFSD</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { handleChangeAuxialiary('CCIS') }} className="justify-center items-center gap-2">
                                        <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                                        <Text>CCIS</Text>
                                    </Pressable>
                                </View>
                                <View className="flex-row justify-center gap-10 items-center">
                                    <Pressable onPress={() => { handleChangeAuxialiary('CHS') }} className="justify-center items-center gap-2">
                                        <FontAwesome5 name="warehouse" size={40} color="green" />
                                        <Text>CHS</Text>
                                    </Pressable>
                                    <Pressable onPress={() => { handleChangeAuxialiary('COE') }} className="justify-center items-center gap-2">
                                        <FontAwesome5 name="warehouse" size={40} color="green" />
                                        <Text>COE</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )
                    }
                </Pressable>
            </Pressable>

        </View>
    );
}