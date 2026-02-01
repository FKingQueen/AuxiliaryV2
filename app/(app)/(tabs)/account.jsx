import { Image, Pressable, Text, View } from 'react-native';
import {
    heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { useAuth } from '../../../context/authContext';

export default function Account() {
    const { logout, user } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }


    };
    console.log('Current user:', user);
    return (
        <View className="flex-1 p-3">
            <View className=" bg-white rounded justify-between flex-row items-center gap-4 p-2 shadow">
                <Image
                    className="border rounded-full"
                    style={{ height: hp(10), width: hp(10) }}
                    resizeMode="contain"
                    source={require("../../../assets/images/user/user.png")}
                />
                <View className="flex-1">
                    <Text className="font-semibold text-xl">{user?.username}</Text>
                </View>
                <Pressable onPress={handleLogout} className="bg-red-500 px-4 py-2 rounded-full">
                    <Text className="text-white font-semibold ">
                        Logout
                    </Text>
                </Pressable>
            </View>

        </View>
    )
}