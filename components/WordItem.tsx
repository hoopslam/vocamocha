import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import { useRef } from 'react';
import { Word } from '../types/types';
import theme from '../theme';

interface Props {
    word: Word;
    onDelete: (id: string) => void;
}

const WordItem = ({ word, onDelete }: Props) => {
    const flipAnimation = useRef(new Animated.Value(0)).current;

    let flipRotation = 0;
    flipAnimation.addListener(({ value }) => (flipRotation = value));

    const flipToFrontStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                }),
            },
        ],
    };

    const flipToBackStyle = {
        transform: [
            {
                rotateX: flipAnimation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['180deg', '360deg'],
                }),
            },
        ],
    };

    const flipToFront = () => {
        Animated.timing(flipAnimation, {
            toValue: 180,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const flipToBack = () => {
        Animated.timing(flipAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => (!!flipRotation ? flipToBack() : flipToFront())}
                style={styles.cardContainer}
            >
                <Animated.View style={{ ...styles.front, ...flipToFrontStyle }}>
                    <Text style={styles.text}>{word.text}</Text>
                </Animated.View>
                <Animated.View style={{ ...styles.back, ...flipToBackStyle }}>
                    <Text style={styles.text}>{word.meaning}</Text>
                </Animated.View>
            </Pressable>
            <Pressable
                android_ripple={{ color: `#210644` }}
                onPress={() => onDelete(word.id)}
                style={({ pressed }) => pressed && styles.pressedItem} //IOS ripple alt
            >
                <View style={styles.deleteContainer}>
                    <Text style={styles.delete}>-</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default WordItem;

const styles = StyleSheet.create({
    container: {
        margin: 8,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.gray,
        flexDirection: `row`,
    },
    cardContainer: {
        flex: 1,
        alignItems: `center`,
        justifyContent: `center`,
    },
    text: {
        padding: 12,
        fontSize: 18,
    },
    front: {
        position: `absolute`,
        backfaceVisibility: `hidden`,
    },
    back: {
        backfaceVisibility: `hidden`,
    },
    pressedItem: {
        opacity: 0.5,
    },
    deleteContainer: {
        flex: 1,
        backgroundColor: theme.dark,
        paddingHorizontal: 20,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    delete: {
        color: theme.gray,
        fontSize: 30,
    },
});
