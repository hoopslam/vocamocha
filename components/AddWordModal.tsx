import { useState } from 'react';
import { Button, TextInput, View, StyleSheet, Modal } from 'react-native';
import { Word } from '../types/types';
import 'react-native-get-random-values'; //keep before uuid import https://github.com/uuidjs/uuid#getrandomvalues-not-supported
import { v4 } from 'uuid';

interface Props {
    words: Word[];
    isVisible: boolean;
    addWord: (newWord: Word) => void;
    closeModal: () => void;
}

const AddWordModal = ({ addWord, closeModal, isVisible }: Props) => {
    const [newWord, setNewWord] = useState(``);
    const [meaning, setMeaning] = useState(``);

    const clearInput = () => {
        setNewWord(``);
        setMeaning(``);
    };

    return (
        <Modal
            animationType='slide'
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Add new word'
                    onChangeText={(e) => setNewWord(e)}
                    value={newWord}
                    style={styles.textInput}
                />
                <TextInput
                    placeholder='What does it mean?'
                    onChangeText={(e) => setMeaning(e)}
                    value={meaning}
                    style={styles.textInput}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title='Add Word'
                        onPress={() => {
                            addWord({
                                id: v4(),
                                text: newWord,
                                meaning,
                            });
                            clearInput();
                            closeModal();
                        }}
                    />
                    <Button
                        title='Cancel'
                        onPress={() => {
                            clearInput();
                            closeModal();
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default AddWordModal;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: `#fff`,
    },
    textInput: {
        backgroundColor: `#fff`,
        width: `70%`,
        padding: 16,
        margin: 8,
        borderRadius: 8,
        color: `#000`,
    },
    buttonContainer: {
        flexDirection: `row`,
    },
});
