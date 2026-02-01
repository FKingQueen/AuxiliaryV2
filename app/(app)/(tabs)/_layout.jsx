import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs, usePathname, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { TabBackground } from '../../../components/TabBackground';
import { useAuth } from '../../../context/authContext';


const backgrounds = {
    '/cart': require('../../../assets/images/bg/1.png'),
    '/home': require('../../../assets/images/bg/2.png'),
    '/account': require('../../../assets/images/bg/3.png'),
};


export default function _layout() {
    const router = useRouter();
    const { user } = useAuth();

    const pathname = usePathname();

    // get last part only
    const route = pathname.split('/').pop();

    const backgrounds = {
        cart: require('../../../assets/images/bg/1.png'),
        home: require('../../../assets/images/bg/2.png'),
        account: require('../../../assets/images/bg/3.png'),
    };


    console.log("Current pathname:", backgrounds[route]);
    return (
        <View className="flex-1">
            <TabBackground source={backgrounds[route]} />
            <Tabs screenOptions={{
                headerTitle: "KIOSK", // 👈 same title
                headerTitleAlign: "center",
                sceneStyle: { backgroundColor: 'transparent' },
                tabBarActiveTintColor: '#156A18',   // active tab text
                tabBarInactiveTintColor: '#9ca3af', // inactive tab text
            }}>
                <Tabs.Screen
                    name="cart"
                    options={{
                        headerLeft: () => (
                            <Pressable onPress={() => router.push("/qrScanner")}>
                                <MaterialIcons style={{ marginLeft: 15 }} name="qr-code-scanner" size={30} color="#156A18" />
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => router.push("/modal")} className="flex-row items-center gap-2">
                                <Text>{user?.Auxiliary}</Text>
                                <AntDesign style={{ marginRight: 15 }} name="home" size={30} color="#156A18" />
                            </Pressable>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "cart" : "cart-outline"}
                                size={30}
                                color="#156A18"
                            />
                        ),
                        title: "Cart",
                    }}
                />

                {/* TAB 2 — TWO DIFFERENT BUTTONS */}
                <Tabs.Screen
                    name="home"
                    options={{
                        headerLeft: () => (
                            <Pressable onPress={() => router.push("/qrScanner")}>
                                <MaterialIcons style={{ marginLeft: 15 }} name="qr-code-scanner" size={30} color="#156A18" />
                            </Pressable>
                        ),
                        headerRight: () => (
                            <Pressable onPress={() => router.push("/modal")} className="flex-row items-center gap-2">
                                <Text>{user?.Auxiliary}</Text>
                                <AntDesign style={{ marginRight: 15 }} name="home" size={30} color="#156A18" />
                            </Pressable>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "home" : "home-outline"}
                                size={30}
                                color="#156A18"
                            />
                        ),
                        title: "Home",
                    }}
                />

                {/* TAB 3 — DIFFERENT BUTTONS */}
                <Tabs.Screen
                    name="account"
                    options={{
                        headerRight: () => (
                            <Pressable onPress={() => console.log("Tab 3 Right")}>
                                <Ionicons style={{ marginRight: 15 }} name="settings" size={30} color="#156A18" />
                            </Pressable>
                        ),
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name={focused ? "person-circle" : "person-circle-outline"}
                                size={30}
                                color="#156A18"
                            />
                        ),
                        title: "Account",

                    }}
                />
            </Tabs>
        </View>
    );
}
