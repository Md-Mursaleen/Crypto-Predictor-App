import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CoinsExchangeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isBuy = route?.params?.isBuy;
    const { id, name, symbol, image, market_data: { current_price: { usd }, market_cap_rank, price_change_percentage_24h } } = route?.params?.cryptoCoin;
    const [coinUSDValue, setCoinUSDValue] = useState("");
    const [coinAmount, setCoinAmount] = useState("");
    useEffect(() => {
        const amount = parseFloat(coinAmount);
        if (!amount && amount !== 0) {
            setCoinAmount("");
            setCoinUSDValue("");
            return;
        }
        setCoinUSDValue((amount * usd).toString());
    }, [coinAmount]);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-sharp" size={25} color="#636b77" onPress={() => navigation.goBack()} style={{ marginLeft: -8 }} />
                <Text style={styles.headingTextStyle}>Coin Exchange</Text>
            </View>
            <Text style={styles.titleTextStyle}>{isBuy ? "Buy " : "Sell "}{name}</Text>
            <Text style={styles.subTitleTextStyle}>1{symbol.toUpperCase()}{" = "}{"$"}{usd}</Text>
            <Image source={require("../../assets/images/order-image.png")} style={styles.imageStyle} />
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="0"
                        placeholderTextColor={"#a7a7a7"}
                        keyboardType="number-pad"
                        value={coinAmount}
                        onChangeText={setCoinAmount}
                        style={styles.textInputStyle} />
                    <Text style={styles.inputTextStyle}>{symbol.toUpperCase()}</Text>
                </View>
                <Text style={styles.textStyle}>{"="}</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="0"
                        placeholderTextColor={"#a7a7a7"}
                        keyboardType="number-pad"
                        value={coinUSDValue}
                        onChangeText={setCoinUSDValue}
                        style={styles.textInputStyle} />
                    <Text style={styles.inputTextStyle}>USD</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CoinsExchangeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    headerContainer: {
        marginTop: 50,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    headingTextStyle: {
        marginLeft: 97,
        fontSize: 19,
        fontWeight: "600"
    },
    titleTextStyle: {
        marginTop: 20,
        fontSize: 23,
        fontWeight: "bold",
        color: "black",
        textAlign: "center"
    },
    subTitleTextStyle: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "600",
        color: "grey",
        textAlign: "center"
    },
    imageStyle: {
        marginTop: 10,
        height: 180,
        alignSelf: "center",
        resizeMode: "contain"
    },
    inputsContainer: {
        marginTop: 30,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    inputContainer: {
        flex: 1,
        padding: 12,
        margin: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "#cdcdcd",
        borderRadius: 5
    },
    textInputStyle: {
        fontSize: 17,
        fontWeight: "500",
        color: "black"
    },
    textStyle: {
        fontSize: 23,
        fontWeight: "400",
        color: "#a7a7a7"
    },
    inputTextStyle: {
        fontSize: 17,
        fontWeight: "400",
        color: "#a7a7a7"
    },
    buttonContainer: {
        padding: 12,
        marginTop: "auto",
        marginBottom: 30,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#5e80fc",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "white"
    }
});