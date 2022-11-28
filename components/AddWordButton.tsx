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
            <Text style={styles.addWord}>+</Text>
        </Pressable>
    );
};

export default AddWordButton;

const styles = StyleSheet.create({
    addWordContainer: {
        position: `absolute`,
        bottom: 60,
        right: 30,
        backgroundColor: theme.gray,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: `center`,
        justifyContent: `center`,
    },
    addWord: {
        fontSize: 30,
        color: theme.dark,
    },
});
