import * as Notifications from 'expo-notifications';

export const setNotifications = async (date: Date) => {
    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `Study Reminder`,
                body: `Grab a coffee and study your vocab!`,
            },
            trigger: {
                repeats: true,
                hour: date.getHours(),
                minute: date.getMinutes(),
            },
        });
        console.log(`notification set with id ${notificationId}`);
        return notificationId;
    } catch (e) {
        console.error(e);
    }
};

export const cancelNotification = async (notificationId: string) => {
    try {
        return await Notifications.cancelScheduledNotificationAsync(
            notificationId
        );
    } catch (e) {
        console.error(e);
    }
};

export const cancelAllNotifications = async () => {
    try {
        return await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (e) {
        console.error(e);
    }
};
