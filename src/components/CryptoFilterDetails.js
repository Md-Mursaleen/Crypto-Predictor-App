import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const CryptoFilterDetails = (props) => {
    const { day, value, selectedText, setSelectedText } = props;

    return (
        <Pressable onPress={() => setSelectedText(day)}
            style={[styles.container, selectedText === day && { backgroundColor: '#ffffff' }]}>
            <Text style={[styles.textStyle, { color: selectedText === day ? '#000000' : '#636b77' }]}>
                {value}</Text>
        </Pressable>
    );
}

export default CryptoFilterDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    textStyle: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        fontWeight: '500',
    },
});