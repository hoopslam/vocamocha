import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import AddWordModal from './components/AddWordModal';
import SettingsModal from './components/SettingsModal';
import theme from './theme';
import VocabList from './components/VocabList';
import AddWordButton from './components/AddWordButton';
import { Word } from './types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_KEY } from './constants';

export default function App() {
    const [words, setWords] = useState<Word[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [settings, setSettings] = useState(false);

    const addWordHandler = async (newWord: Word) => {
        try {
            const jsonValue = JSON.stringify(
                words.length ? [...words, newWord] : [newWord]
            );
            await AsyncStorage.setItem(LOCAL_STORAGE_KEY, jsonValue);
            setWords((current) => [...current, newWord]);
        } catch (e) {
            console.error(e);
        }
    };

    const onDeleteHandler = async (id: string) => {
        if (!words.length) return;
        const filteredWords = words.filter((word) => word.id !== id);

        try {
            await AsyncStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(filteredWords)
            );
            setWords(filteredWords);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        const getLocalData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
                if (jsonValue !== null) {
                    setWords(JSON.parse(jsonValue));
                }
            } catch (e) {
                console.error(e);
            }
        };
        getLocalData();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            {modalVisible && (
                <AddWordModal
                    words={words}
                    addWord={addWordHandler}
                    isVisible={modalVisible}
                    closeModal={() => setModalVisible(false)}
                />
            )}
            {settings && (
                <SettingsModal
                    isVisible={settings}
                    closeModal={() => setSettings(false)}
                />
            )}
            <Header
                onPress={() => setSettings(true)}
                onCloseSettings={() => setSettings(false)}
            />

            <View style={styles.listContainer}>
                <VocabList
                    words={words}
                    onDeleteHandler={onDeleteHandler}
                />
            </View>
            <AddWordButton setModalVisible={setModalVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: theme.black,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    modalContainer: {
        position: `absolute`,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.light,
        alignItems: `center`,
        justifyContent: `center`,
    },
    listContainer: {
        alignItems: `center`,
        width: `100%`,
        height: `80%`,
    },
});
