import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

const CryptoFilterDetails = (props) => {
    const { day, value, selectedText, setSelectedText } = props;
    return (
        <Pressable style={[styles.container, selectedText === day && { backgroundColor: "white" }]}
            onPress={() => setSelectedText(day)}>
            <Text style={[styles.textStyle, { color: selectedText === day ? "black" : "#636b77" }]}>{value}</Text>
        </Pressable>
    );
}

export default CryptoFilterDetails;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "transparent",
        borderRadius: 5
    },
    textStyle: {
        fontWeight: "500"
    }
});