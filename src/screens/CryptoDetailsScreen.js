import React, { useEffect, useState } from "react";
import {
    View, Text, Image, StyleSheet, Dimensions,
    ActivityIndicator, Keyboard, TouchableOpacity
} from "react-native";
import { LineChart } from "react-native-wagmi-charts";
import { CandlestickChart } from "react-native-wagmi-charts";
import { useNavigation } from "@react-navigation/native";
import { getCryptoData, getChartData, getCandleChartData } from "../service/requests";
import { useWatchlist } from "../../src/contexts/WatchlistContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CryptoFilterDetails from "../components/CryptoFilterDetails";

const CryptoDetailsScreen = ({ route }) => {
    const [showingCandleChart, setShowingCandleChart] = useState(true);
    const { cryptoId, storeWatchlistData, removeWatchlistData } = useWatchlist();
    const { cryptoid } = route.params;
    const [cryptoCoin, setCryptoCoin] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [candlechartData, setCandlechartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const SIZE = Dimensions.get("window").width;
    const [cryptoValue, setCryptoValue] = useState("1");
    const [usdValue, setUsdValue] = useState("");
    const [selectedText, setSelectedText] = useState("7");
    const [candleChartVisible, setCandleChartVisible] = useState(true);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const fetchedData = await getCryptoData(cryptoid);
        setCryptoCoin(fetchedData);
        setUsdValue(fetchedData?.market_data?.current_price?.usd.toString());
        setLoading(false);
    };
    const fetchChartData = async (selectedText) => {
        const fetchedChartData = await getChartData(cryptoid, selectedText);
        setChartData(fetchedChartData);
    };
    const fetchCandleChartData = async (selectedText) => {
        const fetchedCandleChartData = await getCandleChartData(selectedText, cryptoid);
        setCandlechartData(fetchedCandleChartData);
    };
    useEffect(() => {
        fetchData();
        fetchChartData(7);
        fetchCandleChartData(7);
    }, []);
    if (loading || !cryptoCoin || !chartData || !candlechartData) {
        return <ActivityIndicator size="large" />
    }
    const { id, name, symbol, image, market_data:
        { current_price: { usd }, market_cap_rank, price_change_percentage_24h } } = cryptoCoin;
    const { prices } = chartData;
    const pricePercentage = price_change_percentage_24h < 0 ? "#c14850" : "#26b985";
    const formatPrice = ({ value }) => {
        "worklet";
        if (value === "") {
            if (usd < 1) {
                return `$${usd}`;
            }
            return `$${usd.toFixed(2)}`;
        }
        if (usd < 1) {
            return `$${parseFloat(value)}`;
        }
        return `$${parseFloat(value).toFixed(2)}`;
    };
    const changingCryptoValue = (value) => {
        setCryptoValue(value);
        const cryptoAmount = parseFloat(value.replace(",", ".")) || 0;
        setUsdValue((cryptoAmount * usd).toString());
    };
    const changingUsdValue = (value) => {
        setUsdValue(value);
        const usdAmount = parseFloat(value.replace(",", ".")) || 0;
        setCryptoValue((usdAmount / usd).toFixed(3).toString());
    };
    const cryptoinWatchlist = () =>
        cryptoId.some((cryptoIdValue) => cryptoIdValue === id);
    const checkWatchlistData = () => {
        if (cryptoinWatchlist()) {
            return removeWatchlistData(id);
        }
        return storeWatchlistData(id);
    };
    const onChangeValue = (value) => {
        setSelectedText(value);
        fetchChartData(value);
        fetchCandleChartData(value);
    };
    const showingLineChart = () => {
        setCandleChartVisible(false)
        setShowingCandleChart(false);
    };
    const showingCandleStickChart = () => {
        setCandleChartVisible(true)
        setShowingCandleChart(true);
    };
    const filterValues = [
        // {
        //     day: "1",
        //     value: "24h"
        // },
        {
            day: "7",
            value: "7d"
        },
        {
            day: "14",
            value: "14d"
        },
        {
            day: "30",
            value: "30d"
        },
        {
            day: "max",
            value: "All"
        }
    ];
    const keyboardShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
            setKeyboardOpen(true);
        }
    );
    const keyboardHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
            setKeyboardOpen(false);
        }
    );
    const onBuyButtonPressed = () => {
        navigation.navigate("CryptoExchange", { isBuy: true, cryptoCoin: cryptoCoin });
    };
    const onSellButtonPressed = () => {
        navigation.navigate("CryptoExchange", { isBuy: false, cryptoCoin: cryptoCoin });
    };
    return (
        <View style={styles.container}>
            <LineChart.Provider data={prices.map(([timestamp, value]) => ({ timestamp, value }))}>
                <View style={styles.headerContainer}>
                    <Ionicons name="chevron-back-sharp" size={25} color="#636b77"
                        onPress={() => navigation.goBack()} />
                    <View style={styles.informationContainer}>
                        <Image source={{ uri: image.small }} style={styles.imageStyle} />
                        <Text style={styles.symbolTextStyle}>{symbol.toUpperCase()}</Text>
                    </View>
                    <FontAwesome name={cryptoinWatchlist() ? "star" : "star-o"} size={25}
                        color={cryptoinWatchlist() ? "#ffbf00" : "#636b77"} onPress={() => checkWatchlistData()} />
                </View>
                <View style={styles.cryptoInfoContainer}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleTextStyle}>{name}</Text>
                            <View style={[styles.positionContainer, market_cap_rank >= 10 &&
                                { width: 26 }, market_cap_rank >= 100 && { width: 36 }]}>
                                <Text style={styles.positionTextStyle}>#{market_cap_rank}</Text>
                            </View>
                        </View>
                        <LineChart.PriceText
                            format={formatPrice}
                            style={styles.priceTextStyle} />
                    </View>
                    <View style={[styles.percentageContainer, { backgroundColor: pricePercentage }]}>
                        <AntDesign name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"} color="#ffffff" size={12}
                            style={styles.iconContainer} />
                        <Text style={styles.percentageTextStyle}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>
                <View style={styles.filterContainer}>
                    {filterValues.map((data, index) => (
                        <CryptoFilterDetails key={index} day={data.day} value={data.value}
                            selectedText={selectedText} setSelectedText={onChangeValue} />
                    ))}
                    {!candleChartVisible ? (<MaterialIcons name="waterfall-chart" size={24} color="#26b985"
                        onPress={() => showingCandleStickChart()} />) :
                        (<MaterialIcons name="show-chart" size={24} color="#26b985" onPress={() => showingLineChart()} />)}
                </View>
                {candleChartVisible ? (
                    <CandlestickChart.Provider data={candlechartData.map(([timestamp, open, high, low, close]) =>
                        ({ timestamp, open, high, low, close }))}>
                        <CandlestickChart height={SIZE / 1.5} width={SIZE} >
                            <CandlestickChart.Candles />
                            <CandlestickChart.Crosshair>
                                <CandlestickChart.Tooltip />
                            </CandlestickChart.Crosshair>
                        </CandlestickChart>
                        <View style={styles.candlechartContainer}>
                            <View>
                                <Text style={styles.candleTextStyle}>Open</Text>
                                <CandlestickChart.PriceText style={styles.candlechartTextStyle} type="open" />
                            </View>
                            <View>
                                <Text style={styles.candleTextStyle}>High</Text>
                                <CandlestickChart.PriceText style={styles.candlechartTextStyle} type="high" />
                            </View>
                            <View>
                                <Text style={styles.candleTextStyle}>Low</Text>
                                <CandlestickChart.PriceText style={styles.candlechartTextStyle} type="low" />
                            </View>
                            <View>
                                <Text style={styles.candleTextStyle}>Close</Text>
                                <CandlestickChart.PriceText style={styles.candlechartTextStyle} type="close" />
                            </View>
                        </View>
                        <CandlestickChart.DatetimeText style={styles.candleChartDateTimeContainer} />
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={onBuyButtonPressed}
                                style={[styles.buttonContainer, { backgroundColor: "#26b985" }]} >
                                <Text style={styles.buttonTextStyle}>BUY</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onSellButtonPressed}
                                style={[styles.buttonContainer, { backgroundColor: "#c14850" }]} >
                                <Text style={styles.buttonTextStyle}>SELL</Text>
                            </TouchableOpacity>
                        </View>
                    </CandlestickChart.Provider>
                ) : (
                    <LineChart height={SIZE / 2} width={SIZE}>
                        <LineChart.Path color={usd > prices[0][1] ? "#26b985" : "#c14850"}>
                            <LineChart.Gradient color={usd > prices[0][1] ? "#26b985" : "#c14850"} />
                        </LineChart.Path>
                        <LineChart.CursorCrosshair color={usd > prices[0][1] ? "#26b985" : "#c14850"} >
                            <LineChart.Tooltip textStyle={styles.lineChartTextStyle} />
                            <LineChart.Tooltip position="bottom" >
                                <LineChart.DatetimeText style={styles.lineChartTextStyle} />
                            </LineChart.Tooltip>
                        </LineChart.CursorCrosshair>
                    </LineChart>
                )}
            </LineChart.Provider>
        </View>
    );
}

export default CryptoDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 50,
        backgroundColor: "#ffffff"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    informationContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    imageStyle: {
        width: 25,
        height: 25
    },
    symbolTextStyle: {
        marginHorizontal: 5,
        fontSize: 17,
        fontWeight: "600",
        color: "#000000"
    },
    cryptoInfoContainer: {
        marginTop: 5,
        paddingVertical: 15,
        marginHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    titleTextStyle: {
        marginRight: 10,
        fontSize: 15,
        fontWeight: "600",
        color: "#000000"
    },
    positionContainer: {
        width: 22,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
        borderRadius: 5
    },
    positionTextStyle: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#636b77"
    },
    priceTextStyle: {
        fontSize: 28,
        fontWeight: "600",
        color: "#000000"
    },
    percentageContainer: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    iconContainer: {
        marginRight: 5,
        alignSelf: "center"
    },
    percentageTextStyle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#ffffff"
    },
    filterContainer: {
        marginBottom: 20,
        marginVertical: 10,
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#f4f4f4",
        borderRadius: 5
    },
    candlechartContainer: {
        marginTop: 30,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    candleTextStyle: {
        fontSize: 13,
        color: "#636b77"
    },
    candlechartTextStyle: {
        fontWeight: "700",
        color: "#000000"
    },
    candleChartDateTimeContainer: {
        margin: 10,
        fontWeight: "700",
        color: "#000000"
    },
    bottomContainer: {
        marginHorizontal: 36,
        marginTop: 50,
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonContainer: {
        padding: 12,
        width: "48%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff"
    },
    lineChartTextStyle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000000"
    }
});