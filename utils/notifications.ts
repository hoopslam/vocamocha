import * as Notifications from 'expo-notifications';

export const setNotifications = async (date: Date, word: string | null) => {
    const trigger = {
        date,
        repeat: `day`,
    };
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: word
                ? `How about learning a new word today?`
                : `Remember this word?`,
            body: word ? word : ``,
        },
        trigger,
    });
    console.log(notificationId);
    return notificationId;
};

export const cancelNotification = async (notificationId: string) => {
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (e) {
        console.error(e);
    }
};

export const cancelAllNotifications = async () => {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (e) {
        console.error(e);
    }
};
