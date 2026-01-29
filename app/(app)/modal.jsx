import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../context/authContext';


export default function modal() {
    const router = useRouter();
    const { changeAuxiliary } = useAuth();

    const handleChangeAuxialiary = async (id) => {

        console.log('ID: ', id);

        switch (id) {
            case 1:
                changeAuxiliary('ADMIN');
                break;
            case 2:
                changeAuxiliary('CAFSD');
                break;
            case 3:
                changeAuxiliary('CCIS');
                break;
            case 4:
                changeAuxiliary('CHS');
                break;
            case 5:
                changeAuxiliary('COE');
                break;
            default:
                break;
        }


        router.back();
    };
    return (
        <Pressable
            className="flex-1 w-full justify-center items-center bg-gray-950/50"
            onPress={() => router.back()}
        >
            {/* 👇 PREVENT CLOSE WHEN CLICKING INSIDE */}
            <Pressable
                className="w-4/5 p-4 bg-white rounded-lg border border-gray-300"
                onPress={() => { }}
            >

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
                        <Pressable onPress={() => { handleChangeAuxialiary(1) }} className="justify-center items-center gap-2">
                            <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                            <Text>ADMIN</Text>
                        </Pressable>
                        <Pressable onPress={() => { handleChangeAuxialiary(2) }} className="justify-center items-center gap-2">
                            <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                            <Text>CAFSD</Text>
                        </Pressable>
                        <Pressable onPress={() => { handleChangeAuxialiary(3) }} className="justify-center items-center gap-2">
                            <FontAwesome5 name="warehouse" size={40} color="#156A18" />
                            <Text>CCIS</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row justify-center gap-10 items-center">
                        <Pressable onPress={() => { handleChangeAuxialiary(4) }} className="justify-center items-center gap-2">
                            <FontAwesome5 name="warehouse" size={40} color="green" />
                            <Text>CHS</Text>
                        </Pressable>
                        <Pressable onPress={() => { handleChangeAuxialiary(5) }} className="justify-center items-center gap-2">
                            <FontAwesome5 name="warehouse" size={40} color="green" />
                            <Text>COE</Text>
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Pressable>
    );
}