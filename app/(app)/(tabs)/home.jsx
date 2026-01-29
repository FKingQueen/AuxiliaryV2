import { Pressable, Text, View } from 'react-native';
import { useAuth } from '../../../context/authContext';

export default function Home() {
    const { logout, user } = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out:", error);
        }

        // console.log('Current user:', user);
    };
    return (
        <View>
            <Text>Home</Text>
            <Pressable onPress={handleLogout}>
                <Text>
                    Sign Out
                </Text>
            </Pressable>
        </View>
    )
}