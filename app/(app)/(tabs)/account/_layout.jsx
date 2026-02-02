import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, Pressable, Text, View } from 'react-native';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useAuth } from '../../../../context/authContext';

// Import your screens
import Analytics from './analytics';
import PreOrder from './preOrder';
import Purchases from './purchases';

const TopTabs = createMaterialTopTabNavigator();

export default function Account() {
    const { logout, user } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
        }
        catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <View className="flex-1 p-3">
            {/* User Header */}
            <View className="bg-white rounded justify-between flex-row items-center gap-4 p-2 shadow mb-3">
                <Image
                    className="border rounded-full"
                    style={{ height: hp(10), width: hp(10) }}
                    resizeMode="contain"
                    source={require("../../../../assets/images/user/user.png")}
                />
                <View className="flex-1">
                    <Text className="font-semibold text-xl">
                        {user?.username}
                    </Text>
                </View>
                <Pressable onPress={handleLogout} className="bg-red-500 px-4 py-2 rounded-full">
                    <Text className="text-white font-semibold">
                        Logout
                    </Text>
                </Pressable>
            </View>

            {/* Top Tabs */}
            <TopTabs.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#156A18',
                    tabBarInactiveTintColor: '#6b7280',
                    tabBarIndicatorStyle: { backgroundColor: '#156A18' },
                    tabBarLabelStyle: { fontWeight: '600', textTransform: 'none' },
                    tabBarStyle: { backgroundColor: 'white', elevation: 0 },
                }}
            >
                <TopTabs.Screen name="PreOrder" component={PreOrder}
                    options={{
                        title: "Pre-Order",
                    }}
                />
                <TopTabs.Screen name="Purchases" component={Purchases} />
                <TopTabs.Screen name="Analytics" component={Analytics} />
            </TopTabs.Navigator>

        </View>
    );
}