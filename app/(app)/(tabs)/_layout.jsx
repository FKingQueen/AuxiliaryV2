import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useAuth } from '../../../context/authContext';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import Account from './account/_layout';
import Cart from './cart';
import Home from './home';

const Tab = createBottomTabNavigator();

export default function _layout() {
    const router = useRouter();
    const { user } = useAuth();

    return (
        <View className="flex-1">
            <Image
                source={require('../../../assets/images/bg/3.png')}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                resizeMode="contain"
            />
            <Tab.Navigator
                screenOptions={{
                    animation: 'shift',
                    headerTitle: "KIOSK",
                    headerTitleAlign: "center",
                    sceneStyle: { backgroundColor: 'transparent' },
                    tabBarActiveTintColor: '#156A18',
                    tabBarInactiveTintColor: '#9ca3af',

                }}

            >
                <Tab.Screen name="Cart" component={Cart}
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
                <Tab.Screen name="Home" component={Home}
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
                <Tab.Screen name="Account" component={Account}
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
            </Tab.Navigator>

            {/* <Tabs screenOptions={{
                headerTitle: "KIOSK",
                headerTitleAlign: "center",
                sceneStyle: { backgroundColor: 'transparent' },
                tabBarActiveTintColor: '#156A18',
                tabBarInactiveTintColor: '#9ca3af',
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
            </Tabs> */}
        </View>
    );
} ``