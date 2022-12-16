import * as Notifications from 'expo-notifications';

export const setNotifications = async (
    hour: number = 16,
    minute: number = 11
) => {
    const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
            title: 'Study Reminder',
            body: 'Testing 123',
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
