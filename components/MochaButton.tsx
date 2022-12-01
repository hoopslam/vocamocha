import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface Props {
    text: string;
    onPress?: () => void;
}

const MochaButton = ({ text, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.buttonContainer}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

export default MochaButton;

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: `center`,
        alignItems: `center`,
        padding: 20,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.dark,
    },
    text: {
        color: theme.gray,
    },
});
