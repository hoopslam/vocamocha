import { cancelAllScheduledNotificationsAsync } from 'expo-notifications';
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const TimePicker = () => {
    const [isPickerVisible, setIsPickerVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);

    const showPicker = () => {
        setIsPickerVisible(true);
    };

    const hidePicker = () => {
        setIsPickerVisible(false);
        cancelAllScheduledNotificationsAsync;
    };

    const handleConfirm = (time) => {
        setSelectedTime(time);
        hidePicker();
    };

    return (
        <View style={styles.timePickerContainer}>
            <Button
                title='Select Time'
                onPress={showPicker}
            />
            <DateTimePicker
                style={styles.timePicker}
                isVisible={isPickerVisible}
                onConfirm={handleConfirm}
                onCancel={hidePicker}
                mode='time'
                is24Hour
            />
        </View>
    );
};

export default TimePicker;

const styles = StyleSheet.create({
    timePickerContainer: {
        flex: 1,
        justifyContent: `center`,
        alignItems: `center`,
    },
    timePicker: {
        flex: 1,
        height: 300,
        width: 150,
    },
});
