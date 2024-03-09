import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet, Pressable } from "react-native";
import { useWatchlist } from "../../src/contexts/WatchlistContext";
import { getWatchlistedCrypto } from "../service/requests"
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../components/theme";
import CryptoItem from "../components/CryptoItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import LottieView from "lottie-react-native";

const WatchlistScreen = () => {
    const navigation = useNavigation();
    const { cryptoId } = useWatchlist();
    const [cryptoCurrency, setCryptoCurrency] = useState([]);
    const [loading, setLoading] = useState(false);
    const formattedId = () => cryptoId.join("%2C");
    const fetchWatchlistedCrypto = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const watchlistedCrypto = await getWatchlistedCrypto(1, formattedId());
        setCryptoCurrency(watchlistedCrypto);
        setLoading(false);
    };
    useEffect(() => {
        if (cryptoId?.length > 0) {
            fetchWatchlistedCrypto();
        }
    }, [cryptoId]);
    console.log(cryptoId?.length);
    return (
        cryptoId?.length === 0 ? (
            <View style={styles.container}>
                <View style={styles.noWatchlistHeaderContainer}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <LottieView source={require("../../assets/animations/watchlist-animation.json")}
                    autoPlay
                    speed={0.8}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitleTextStyle}>Your watchlist is empty</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(18) }]}>
                        Start building your watchlist by clicking</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(5) }]}>button below.</Text>
                </View>
                <Pressable style={styles.buttonContainer}
                    onPress={() => navigation.navigate("Markets")}>
                    <Text style={styles.buttonTextStyle}>Add New Coins</Text>
                </Pressable >
            </View>
        ) : (
            <View style={styles.watchlistedContainer}>
                <View style={styles.watchlistedHeaderContainer}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <View style={styles.watchlistedSubContainer}>
                    <View style={styles.watchlistedSubItemContainer}>
                        <Text style={[styles.watchlistedSubTextStyle, { fontSize: 15 }]}>#</Text>
                        <AntDesign name="caretdown" color="#5e80fc" size={12} />
                    </View>
                    <View style={styles.watchlistedSubItemContainer}>
                        <Text style={styles.watchlistedSubTextStyle}>Market Cap</Text>
                        <AntDesign name="caretdown" color="#5e80fc" size={12}
                            style={{ marginRight: normalize(20) }} />
                    </View>
                    <View style={[styles.watchlistedSubItemContainer, { marginLeft: normalize(10) }]}>
                        <Text style={styles.watchlistedSubTextStyle}>24h%</Text>
                        <AntDesign name="caretdown" color="#5e80fc" size={12}
                            style={{ marginRight: normalize(10) }} />
                    </View>
                    <View style={[styles.watchlistedSubItemContainer, { marginRight: normalize(-15) }]}>
                        <Text style={styles.watchlistedSubTextStyle}>Price(USD)</Text>
                        <AntDesign name="caretdown" color="#5e80fc" size={12}
                            style={{ marginRight: normalize(8) }} />
                    </View>
                </View>
                <FlatList data={cryptoCurrency} renderItem={({ item }) => (
                    <CryptoItem cryptodata={item} />
                )} refreshControl={
                    <RefreshControl refreshing={loading}
                        tintColor="#000000"
                        onRefresh={cryptoId?.length > 0 ? fetchWatchlistedCrypto : null} />
                } style={{ marginTop: normalize(8) }} />
            </View>
        )
    );
}

export default WatchlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141323"
    },
    noWatchlistHeaderContainer: {
        paddingTop: normalize(50),
        paddingHorizontal: normalize(10),
        paddingBottom: normalize(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textStyle: {
        marginLeft: normalize(10),
        fontSize: 23,
        fontWeight: "bold",
        color: "#ffffff"
    },
    lottieStyle: {
        marginTop: normalize(60),
        width: normalize(100),
        height: normalize(185),
        alignSelf: "center"
    },
    headerTitleTextStyle: {
        marginTop: normalize(75),
        alignSelf: "center",
        fontSize: 27,
        fontWeight: "bold",
        color: "#d6d6d8"
    },
    headerSubTitleTextStyle: {
        alignSelf: "center",
        fontSize: 16.5,
        fontWeight: "500",
        color: "#808b9d"
    },
    buttonContainer: {
        padding: normalize(12),
        marginVertical: normalize(165),
        marginHorizontal: normalize(10),
        alignItems: "center",
        backgroundColor: "#0052fe",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ffffff"
    },
    watchlistedContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    watchlistedHeaderContainer: {
        paddingTop: normalize(50),
        paddingHorizontal: normalize(10),
        paddingBottom: normalize(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    watchlistedSubContainer: {
        marginTop: normalize(10),
        marginHorizontal: normalize(15),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    watchlistedSubItemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    watchlistedSubTextStyle: {
        marginRight: normalize(5),
        fontSize: 13.5,
        fontWeight: "500",
        color: "#60687b"
    }
});