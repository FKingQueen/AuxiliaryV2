import { useEffect } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export function TabBackground({ source }) {
    console.log("TabBackground source:", source);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = 0;
        opacity.value = withTiming(1, { duration: 500 });
    }, [source]);


    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));
    // console.log(animatedStyle);
    return (
        <AnimatedImage
            source={source}
            style={[StyleSheet.absoluteFill, animatedStyle]}
            resizeMode="contain"
        />
    );
}
