import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import theme from '../theme';

interface Props {
    onPress: () => void;
    onCloseSettings: () => void;
}

const Header = ({ onPress, onCloseSettings }: Props) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Voca Mocha</Text>
            <AntDesign
                name='setting'
                size={24}
                color='white'
                onPress={onPress}
            />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    title: {
        color: theme.white,
        fontSize: 20,
    },
    headerContainer: {
        flexDirection: `row`,
        backgroundColor: theme.green,
        width: `100%`,
        padding: 15,
        paddingTop: 35,
        justifyContent: `space-between`,
    },
});
