import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from "react-native-chart-kit";
import AntDesign from "react-native-vector-icons/AntDesign";

const CryptoItem = ({ cryptodata }) => {
    const navigation = useNavigation();
    const { id, symbol, image, current_price, market_cap_rank, market_cap, price_change_percentage_24h, sparkline_in_7d } = cryptodata;
    const cryptoMarketCap = (market_cap) => {
        if (market_cap > 1e12) {
            return `${(market_cap / 1e12).toFixed(3)} Tn`;
        }
        if (market_cap > 1e9) {
            return `${(market_cap / 1e9).toFixed(3)} Bn`;
        }
        if (market_cap > 1e6) {
            return `${(market_cap / 1e6).toFixed(3)} Mn`;
        }
        if (market_cap > 1e3) {
            return `${(market_cap / 1e3).toFixed(3)} K`;
        }
        return market_cap;
    }
    const pricePercentage = price_change_percentage_24h < 0 ? "#c14850" : "#26b985";
    return (
        <Pressable style={styles.cryptoContainer} onPress={() => navigation.navigate("CryptoDetails", {
            cryptoid: id
        })}>
            <Text style={styles.positionTextStyle}>{market_cap_rank}</Text>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.symbolSytle}>{symbol?.toUpperCase()}</Text>
                <Text style={styles.marketCapStyle}>{cryptoMarketCap(market_cap)}</Text>
            </View>
            <View style={styles.percentageChangeGraphContainer}>
                <LineChart withHorizontalLabels={false}
                    withVerticalLabels={false}
                    withDots={false}
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLines={false}
                    data={{
                        datasets: [
                            {
                                data: sparkline_in_7d?.price
                            }
                        ]
                    }}
                    width={85}
                    height={48}
                    chartConfig={{
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        color: () => pricePercentage
                    }}
                    bezier
                    style={{ paddingRight: 0 }}
                />
            </View>
            <View style={styles.priceValueContainer}>
                <Text style={styles.priceTextStyle}>{current_price === 1 ? "1.00" : current_price < 1 ? (current_price).toFixed(5) : current_price}</Text>
                <View style={[styles.pricePercentageContainer,]}>
                    <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color={pricePercentage} size={10} style={styles.iconStyle} />
                    <Text style={[styles.priceChangeTextStyle, { color: pricePercentage }]}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default CryptoItem;

const styles = StyleSheet.create({
    cryptoContainer: {
        padding: 13,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "white"
    },
    positionTextStyle: {
        marginLeft: 1,
        fontSize: 14.5,
        fontWeight: "500",
        color: "#7a7f8a"
    },
    imageStyle: {
        marginLeft: 30,
        marginRight: 10,
        height: 27,
        width: 27
    },
    symbolSytle: {
        marginRight: 5,
        fontWeight: "bold",
        color: "black"
    },
    marketCapStyle: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "500",
        color: "#656e78"
    },
    percentageChangeGraphContainer: {
        marginRight: -15,
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    priceValueContainer: {
        paddingLeft: 15,
        marginLeft: "auto",
        flexDirection: "column",
        alignItems: "center"
    },
    priceTextStyle: {
        marginLeft: 2,
        marginBottom: 2,
        fontSize: 14.5,
        fontWeight: "500",
        color: "black"
    },
    pricePercentageContainer: {
        marginRight: -2,
        width: 65,
        height: 26,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    iconStyle: {
        marginRight: 5,
        alignSelf: "center"
    },
    priceChangeTextStyle: {
        fontSize: 13,
        fontWeight: "500"
    }
});