import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRecoilValue, useRecoilState } from "recoil";
import { portfolioassets } from "../atoms/PortfolioAssets";
import { SwipeListView } from "react-native-swipe-list-view";
import { portfolioassetsinstore } from "../atoms/PortfolioAssets";
import { normalize } from "../components/theme";
import PortfolioAssetItem from "./PortfolioAssetItem";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const PortfolioAssets = () => {
    const assets = useRecoilValue(portfolioassets);
    const [storedAssets, setStoredAssets] = useRecoilState(portfolioassetsinstore);
    const navigation = useNavigation();

    const currentBalance = () => assets.reduce((total, currentAsset) => total +
        (currentAsset.current_price * currentAsset.quantity), 0);

    const currentValue = () => {
        const currentbalance = currentBalance();
        const boughtValue = assets.reduce((total, currentAsset) => total +
            (currentAsset.price * currentAsset.quantity), 0);
        return (currentbalance - boughtValue).toFixed(2);
    };

    const currentpercentage = () => {
        const currentbalance = currentBalance();
        const boughtValue = assets.reduce((total, currentAsset) => total +
            (currentAsset.price * currentAsset.quantity), 0);
        return ((currentbalance - boughtValue) / boughtValue * 100 || 0).toFixed(2);
    };

    const deletingAsset = async (asset) => {
        const newAssets = storedAssets.filter((crypto, index) => crypto.uniqueid !== asset.item.uniqueid);
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_crypto", jsonData);
        setStoredAssets(newAssets);
    };

    const deletebutton = (data) => {
        return (
            <Pressable style={styles.deleteButtonContainer} onPress={() => deletingAsset(data)}>
                <FontAwesome name="trash-o" size={24} color="#ffffff" />
            </Pressable>
        );
    };

    return (
        assets?.length === 0 ? (
            <>
                <Text style={styles.textStyle}>Portfolio</Text>
                <LottieView source={require("../../assets/animations/searching-animation.json")}
                    autoPlay
                    speed={2.0}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitleTextStyle}>Your portfolio is empty</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(18) }]}>
                        Add the first asset by tapping on the</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(5) }]}>button below.</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("Asset")}
                    style={[styles.buttonContainer, assets.length === 0 && { marginTop: normalize(160) }]}>
                    <Text style={styles.buttonTextStyle}>Add New Asset</Text>
                </Pressable >
            </>
        ) : (
            <SwipeListView data={assets}
                renderItem={({ item }) => <PortfolioAssetItem assetitem={item} />}
                rightOpenValue={-75}
                disableRightSwipe
                keyExtractor={({ id }, index) => `${id}${index}`}
                renderHiddenItem={(data) => deletebutton(data)}
                ListHeaderComponent={
                    <>
                        <Text style={styles.textStyle}>Portfolio</Text>
                        <View style={styles.balanceContainer}>
                            <View>
                                <Text style={styles.balanceTextStyle}>Current Balance</Text>
                                <Text style={styles.balanceValueTextStyle}>${currentBalance()?.toFixed(2)}</Text>
                                <Text style={[styles.changePriceTextStyle,
                                { color: currentValue() >= 0 ? "#6ac77e" : "#d0585c" }]}>
                                    ${currentValue()} (24h)</Text>
                            </View>
                            <View style={[styles.percentageChangeContainer,
                            { backgroundColor: currentValue() >= 0 ? "#6ac77e" : "#d0585c" }]}>
                                <AntDesign name={currentValue() >= 0 ? "caretup" : "caretdown"} color="#ffffff"
                                    style={styles.iconStyle} />
                                <Text style={styles.percentageChangeTextStyle}>{currentpercentage()}%</Text>
                            </View>
                        </View>
                        <Text style={styles.assetsTextStyle}>Your Assets</Text>
                        <View style={styles.headerContainer}>
                            <Text style={[styles.headerTextStyle, { fontSize: 14 }]}>Asset</Text>
                            <Text style={[styles.headerTextStyle, { marginLeft: normalize(35) }]}>24H Price</Text>
                            <View style={[styles.headerItemContainer, { marginRight: normalize(-8) }]}>
                                <Text style={styles.headerTextStyle}>Holdings</Text>
                                <AntDesign name="caretdown" color="#5e80fc" size={12} />
                            </View>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <Pressable onPress={() => navigation.navigate("Asset")}
                        style={styles.buttonContainer}>
                        <Text style={styles.buttonTextStyle}>Add New Asset</Text>
                    </Pressable >
                } />
        )
    );
}

export default PortfolioAssets;

const styles = StyleSheet.create({
    textStyle: {
        marginLeft: normalize(15),
        fontSize: 25.5,
        fontWeight: "bold",
        color: "#ffffff"
    },
    lottieStyle: {
        marginTop: normalize(60),
        height: normalize(185),
        alignSelf: "center"
    },
    headerTitleTextStyle: {
        marginTop: normalize(80),
        fontSize: 27,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#d6d6d8"
    },
    headerSubTitleTextStyle: {
        fontSize: 16.5,
        fontWeight: "500",
        alignSelf: "center",
        color: "#808b9d"
    },
    buttonContainer: {
        padding: normalize(12),
        marginVertical: normalize(25),
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
    balanceContainer: {
        marginTop: normalize(15),
        marginBottom: normalize(5),
        marginHorizontal: normalize(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    balanceTextStyle: {
        marginLeft: normalize(4),
        fontSize: 16,
        fontWeight: "600",
        color: "grey"
    },
    balanceValueTextStyle: {
        marginTop: normalize(5),
        marginLeft: normalize(3.5),
        fontSize: 28.5,
        fontWeight: "700",
        color: "#d6d6d8"
    },
    changePriceTextStyle: {
        marginTop: normalize(3),
        marginLeft: normalize(5),
        fontSize: 14.5,
        fontWeight: "700"
    },
    percentageChangeContainer: {
        paddingHorizontal: normalize(5),
        paddingVertical: normalize(8),
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10
    },
    iconStyle: {
        marginRight: normalize(5),
        alignSelf: "center"
    },
    percentageChangeTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "#ffffff"
    },
    assetsTextStyle: {
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(20),
        fontSize: 18,
        fontWeight: "700",
        color: "#d6d6d8"
    },
    headerContainer: {
        marginBottom: normalize(10),
        marginHorizontal: normalize(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerTextStyle: {
        marginRight: normalize(5),
        fontSize: 13,
        fontWeight: "500",
        color: "#636b77"
    },
    headerItemContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    deleteButtonContainer: {
        flex: 1,
        marginLeft: normalize(20),
        paddingRight: normalize(28),
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "#ea3943"
    }
});