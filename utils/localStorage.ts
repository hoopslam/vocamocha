import AsyncStorage from '@react-native-async-storage/async-storage';
import { Word } from '../types/types';

export interface LocalDataObject {
    words?: Word[];
    notification?: {
        id: string;
        hour: number;
        minute: number;
    };
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

export const deleteLocalNotification = async () => {
    try {
        const localJSON = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        if (localJSON) {
            const localData = JSON.parse(localJSON);
            if (localData.notification) {
                delete localData.notification;
            }
            await AsyncStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({
                    ...localData,
                })
            );
            return;
        }
    } catch (e) {
        console.error(e);
    }
};

export const setNotificationLocally = async (
    notificationId: string,
    time: Date
) => {
    try {
        const localJSON = await AsyncStorage.getItem(LOCAL_STORAGE_KEY);
        const localData = JSON.parse(localJSON ? localJSON : ``);

        await AsyncStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
                ...localData,
                notification: {
                    id: notificationId,
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                },
            })
        );
        console.log(`notification set locally`);
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

//Used because stringify removes Date object prototype
export const createDateObject = (hour: number, minute: number) => {
    let date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
};
