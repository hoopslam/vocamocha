import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Word } from '../types/types';
import theme from '../theme';

interface Props {
    word: Word;
    onDelete: (id: string) => void;
}

const WordItem = ({ word, onDelete }: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.wordContainer}>
                <Pressable
                    android_ripple={{ color: `#210644` }}
                    //TODO: add translation reveal
                    onPress={() => console.log(`pressed`)}
                    style={({ pressed }) => pressed && styles.pressedItem} //IOS ripple alt
                >
                    <Text style={styles.wordText}>{word.text}</Text>
                </Pressable>
            </View>
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
    wordContainer: {
        flex: 1,
    },
    wordText: {
        padding: 12,
        fontSize: 18,
    },
    pressedItem: {
        opacity: 0.5,
    },
    deleteContainer: {
        flex: 1,
        backgroundColor: theme.light,
        padding: 14,
        justifyContent: `center`,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    delete: {
        color: theme.dark,
    },
});
