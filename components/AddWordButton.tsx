import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../theme';

interface Props {
    setModalVisible: (value: boolean) => void;
}

const AddWordButton = ({ setModalVisible }: Props) => {
    return (
        <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.addWordContainer}
        >
            <Text
                adjustsFontSizeToFit
                style={styles.addWord}
            >
                +
            </Text>
        </Pressable>
    );
};

export default AddWordButton;

const styles = StyleSheet.create({
    addWordContainer: {
        backgroundColor: theme.gray,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: `center`,
        justifyContent: `center`,
    },
    addWord: {
        fontSize: 40,
        marginBottom: 5,
        color: theme.green,
    },
});
