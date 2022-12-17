import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import theme from '../theme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { cancelNotification, setNotifications } from '../utils/notifications';

interface Props {
    isVisible: boolean;
    randomWord: string;
    closeModal: () => void;
}

const SettingsModal = ({ isVisible, randomWord, closeModal }: Props) => {
    const [isNotifications, setIsNotifications] = useState(false); //TODO: save to local storage
    const [showTimePicker, setShowTimePicker] = useState(true);
    const [time, setTime] = useState(new Date(1598051730000));

    const hour = 12; //TODO: Set hour/min later
    const minute = 0;

    const handleNotificationTime = (event: any, selectedTime: any) => {
        console.log(`setTime`);
        const currentTime = selectedTime;
        setShowTimePicker(false);
        setTime(currentTime);
    };

    // const handleNotificationToggle = () => {
    //     if (isNotifications) {
    //         cancelNotification() // notificationId from local storage
    //         setIsNotifications(false)
    //         return;
    //     }
    //     setIsNotifications(true)
    //     const notificationId = setNotifications(hour, minute, randomWord)
    // }

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
                    onPress={() => {
                        setIsNotifications((current) => !current);
                        setNotifications(hour, minute, randomWord); //TODO: send hour and minute
                    }}
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
                    <Text style={styles.text}>Set daily reminder time</Text>
                </Pressable>
                {showTimePicker && (
                    <DateTimePicker
                        testID='dateTimePicker'
                        value={time}
                        mode={`time`}
                        is24Hour={true}
                        onChange={handleNotificationTime}
                        style={styles.timePicker}
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
        textAlign: `start`,
        justifyContent: `center`,
        alignItems: `center`,
        backgroundColor: theme.gray,
    },
});
