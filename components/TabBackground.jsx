import { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export function TabBackground({ source }) {
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = 0;
        opacity.value = withTiming(1, {
            duration: 300
        });
    }, [source]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <AnimatedImage
            source={source}
            style={[StyleSheet.absoluteFill, animatedStyle]}
            resizeMode="cover"
        />
    );
}
