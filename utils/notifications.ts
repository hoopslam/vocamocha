import * as Notifications from 'expo-notifications';

export const setNotifications = async (
    hour: number = 12,
    minute: number = 0,
    word: string
) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Remember this word?',
            body: word,
        },
        trigger: {
            hour,
            minute,
            repeats: true,
        },
    });
    return notificationId;
};

export const cancelNotification = async (notificationId: string) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
};
