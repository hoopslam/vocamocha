import {
    Modal,
    View,
    Text,
    Alert,
    StyleSheet,
    Pressable,
    Platform,
} from 'react-native';
import { useState } from 'react';
import theme from '../theme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
    cancelAllNotifications,
    cancelNotification,
    setNotifications,
} from '../utils/notifications';
import { getLocalData, setNotificationLocally } from '../utils/localStorage';

interface Props {
    isVisible: boolean;
    randomWord: string | null;
    notificationId?: string;
    notificationTime?: Date;
    closeModal: () => void;
}

const SettingsModal = ({
    isVisible,
    randomWord,
    notificationId,
    notificationTime,
    closeModal,
}: Props) => {
    const [isNotifications, setIsNotifications] = useState(
        Boolean(notificationId)
    );
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [time, setTime] = useState(notificationTime ?? new Date());

    const onNotificationTimeChange = (
        event: DateTimePickerEvent,
        selectedTime: Date
    ) => {
        setShowTimePicker(false);
        setTime(selectedTime);
    };

    const enableNotifications = async (date: Date) => {
        const notificationId = await setNotifications(date, randomWord);
        setNotificationLocally(notificationId, date);
        setIsNotifications(true);
        Alert.alert(
            `Notification Set`,
            `Notification set to ${date.toLocaleTimeString()}`
        );
    };

    const disableNotifications = async () => {
        if (notificationId) {
            try {
                cancelNotification(notificationId);
            } catch (e) {
                console.error(e);
            }
        }
        try {
            cancelAllNotifications();
            setIsNotifications(false);
            Alert.alert(
                `Notificadtions Cancelled`,
                `All notifications have been cancelled`
            );
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Modal
            animationType='fade'
            visible={isVisible}
            onRequestClose={closeModal}
        >
            <View style={styles.settingsContainer}>
                <Ionicons
                    name='close'
                    size={30}
                    color='white'
                    onPress={closeModal}
                    style={styles.closeIcon}
                />
                <Pressable
                    onPress={() =>
                        //TODO: Put in a check to see if notification time is set.  If not, do something
                        isNotifications
                            ? disableNotifications()
                            : enableNotifications(time)
                    }
                    style={styles.row}
                >
                    <Ionicons
                        name={
                            isNotifications
                                ? `notifications`
                                : `notifications-off`
                        }
                        size={24}
                        color='white'
                    />
                    <Text style={styles.text}>
                        Turn study reminders {isNotifications ? `off` : `on`}
                    </Text>
                </Pressable>
                <Pressable
                    style={styles.row}
                    onPress={() => {
                        console.log(`pressed`);
                        setShowTimePicker(true);
                    }}
                >
                    <Text style={styles.text}>
                        {notificationTime
                            ? `Notification scheduled daily at ${notificationTime.toLocaleTimeString()}`
                            : `Select a daily study reminder time`}
                    </Text>
                </Pressable>
                {showTimePicker && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={time}
                        mode={`time`}
                        onChange={onNotificationTimeChange}
                        style={styles.timePicker}
                        display={Platform.OS === `ios` ? `spinner` : `clock`}
                    />
                )}
            </View>
        </Modal>
    );
};

export default SettingsModal;

const styles = StyleSheet.create({
    settingsContainer: {
        paddingTop: 100,
        flex: 1,
        justifyContent: `flex-start`,
        alignItems: `flex-start`,
        backgroundColor: theme.black,
    },
    closeIcon: {
        position: `absolute`,
        top: 52,
        right: 16,
    },
    row: {
        flexDirection: `row`,
        widtH: `100%`,
        justifyContent: `center`,
        alignItems: `center`,
        margin: 20,
    },
    text: {
        color: theme.white,
        fontSize: 16,
        marginLeft: 12,
    },
    timePicker: {
        flex: 1,
        width: `100%`,
        backgroundColor: theme.white,
    },
});
