import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const PortfolioAssetItem = ({ assetitem }) => {
    const { name, symbol, image, current_price, quantity, price_change_percentage_24h } = assetitem;
    const pricePercentage = price_change_percentage_24h < 0 ? "#d0585c" : "#6ac77e";

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.textStyle}>{name}</Text>
                <Text style={styles.symbolTextStyle}>{symbol}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.textStyle}>${(current_price).toFixed(2)}</Text>
                <View style={styles.percentageChangeContainer}>
                    <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"}
                        color={pricePercentage}
                        style={styles.iconStyle} />
                    <Text style={[styles.percentageChangeText, { color: pricePercentage }]}>
                        {price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
            <View style={styles.quantityContainer}>
                <Text style={styles.textStyle}>${(quantity * current_price)?.toFixed(2)}</Text>
                <Text style={styles.symbolTextStyle}>{quantity} {symbol}</Text>
            </View>
        </View>
    );
}

export default PortfolioAssetItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#141323"
    },
    imageStyle: {
        marginLeft: -5,
        marginRight: 10,
        width: 27,
        height: 27
    },
    textStyle: {
        fontSize: 15,
        fontWeight: "600",
        alignSelf: "flex-end",
        color: "#d6d6d8"
    },
    symbolTextStyle: {
        fontSize: 13.5,
        fontWeight: "500",
        color: "grey"
    },
    priceContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    },
    percentageChangeContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    iconStyle: {
        marginRight: 5,
        alignSelf: "center"
    },
    percentageChangeText: {
        fontWeight: "600"
    },
    quantityContainer: {
        marginLeft: "auto",
        alignItems: "flex-end"
    }
});