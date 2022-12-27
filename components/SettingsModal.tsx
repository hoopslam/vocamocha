import {
    Modal,
    View,
    Text,
    Alert,
    StyleSheet,
    Pressable,
    Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import theme from '../theme';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {
    cancelAllNotifications,
    setNotifications,
} from '../utils/notifications';
import {
    createDateObject,
    deleteLocalNotification,
    getLocalData,
    setNotificationLocally,
} from '../utils/localStorage';

interface Props {
    isVisible: boolean;
    closeModal: () => void;
}

const SettingsModal = ({ isVisible, closeModal }: Props) => {
    const [isNotifications, setIsNotifications] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const onNotificationTimeChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        if (selectedDate) {
            setSelectedTime(selectedDate);
        }
        setShowTimePicker(false);
    };
    console.log(selectedTime);

    const parseMinutes = (minutes: number) => {
        if (minutes < 10) {
            return `0${minutes}`;
        }
        return `${minutes}`;
    };

    const onSaveSettings = async () => {
        if (!isNotifications) {
            cancelAllNotifications();
            deleteLocalNotification();
            Alert.alert(
                `Notifications cancelled`,
                `All notifications have been cancelled`
            );
            return;
        }
        if (!selectedTime) {
            Alert.alert(`Please select a notification time`);
            return;
        }
        const newNotificationId = await setNotifications(selectedTime);
        if (newNotificationId) {
            setNotificationLocally(newNotificationId, selectedTime);
            Alert.alert(
                `Notification Set`,
                `Notification set to ${selectedTime.getHours()}:${parseMinutes(
                    selectedTime.getMinutes()
                )}`
            );
        }
    };

    useEffect(() => {
        const loadLocalNotifications = async () => {
            const localData = await getLocalData();
            console.log(`test: ${localData?.notification}`);
            if (localData?.notification) {
                let newDateObject = new Date();
                newDateObject.setHours(localData.notification.hour);
                newDateObject.setMinutes(localData.notification.minute);
                setIsNotifications(true);
                setSelectedTime(newDateObject);
            }
        };
        loadLocalNotifications();
    }, []);

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
                        isNotifications
                            ? setIsNotifications(false)
                            : setIsNotifications(true)
                    }
                    style={styles.row}
                >
                    <Ionicons
                        name={
                            isNotifications
                                ? `notifications-off`
                                : `notifications`
                        }
                        size={24}
                        color='white'
                    />
                    <Text style={styles.text}>
                        Turn notifications {isNotifications ? `off` : `on`}
                    </Text>
                </Pressable>
                {isNotifications && (
                    <>
                        <Pressable
                            style={styles.row}
                            onPress={() => {
                                setShowTimePicker(true);
                            }}
                        >
                            <AntDesign
                                name={`clockcircleo`}
                                size={24}
                                color='white'
                            />
                            <Text style={styles.text}>
                                {selectedTime
                                    ? `Reminder scheduled for ${selectedTime.getHours()}:${parseMinutes(
                                          selectedTime.getMinutes()
                                      )}`
                                    : `Schedule Study Reminder`}
                            </Text>
                        </Pressable>
                        {showTimePicker && (
                            <DateTimePicker
                                is24Hour
                                testID='dateTimePicker'
                                value={selectedTime}
                                mode={`time`}
                                onChange={onNotificationTimeChange}
                                style={styles.timePicker}
                                display={
                                    Platform.OS === `ios` ? `spinner` : `clock`
                                }
                            />
                        )}
                    </>
                )}
                <Pressable
                    style={[styles.row, styles.buttonContainer]}
                    onPress={() => {
                        onSaveSettings();
                    }}
                >
                    <View style={styles.saveButton}>
                        <Text>Save Settings</Text>
                    </View>
                </Pressable>
            </View>
        </Modal>
    );
};

export default SettingsModal;

const styles = StyleSheet.create({
    settingsContainer: {
        paddingTop: 100,
        flex: 1,
        flexWrap: `wrap`,
        backgroundColor: theme.black,
    },
    closeIcon: {
        position: `absolute`,
        top: 52,
        right: 16,
    },
    row: {
        flexDirection: `row`,
        width: `100%`,
        justifyContent: `flex-start`,
        alignItems: `center`,
        margin: 16,
    },
    text: {
        color: theme.white,
        fontSize: 16,
        marginLeft: 12,
    },
    buttonContainer: {
        justifyContent: `center`,
        margin: 0,
        marginTop: 24,
    },
    saveButton: {
        width: 200,
        backgroundColor: theme.light,
        padding: 10,
        borderRadius: theme.borderRadius,
        alignItems: `center`,
    },
    timePicker: {
        flex: 1,
        width: `100%`,
        backgroundColor: theme.white,
    },
});
