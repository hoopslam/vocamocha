import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word } from '../types/types';

interface LocalDataObject {
    words?: Word[];
    notificationId?: string;
}
const LOCAL_STORAGE_KEY = `VOCA_MOCHA_DATA`;

export const setWordsLocally = async (words: Word[]) => {
    try {
        const localJSON = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        if (localJSON) {
            const localData = JSON.parse(localJSON);
            await AsyncStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({
                    ...localData,
                    words,
                })
            );
            return;
        }
        await AsyncStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
                words,
            })
        );
    } catch (e) {
        console.error(e);
    }
};

export const setNotificationIdLocally = async (notificationId: string) => {
    try {
        const localJSON = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        const localData = JSON.parse(localJSON ? localJSON : ``);
        await AsyncStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
                ...localData,
                notificationId,
            })
        );
    } catch (e) {
        console.error(e);
    }
};

export const getLocalData = async () => {
    try {
        const localJSON = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        if (localJSON) {
            const localData = JSON.parse(localJSON);
            return localData as LocalDataObject;
        }
        return null;
    } catch (e) {
        console.error(e);
        return null;
    }
};
