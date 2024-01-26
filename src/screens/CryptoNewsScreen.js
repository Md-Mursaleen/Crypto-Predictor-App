import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";

const CryptoNewsScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.noWatchlistHeaderContainer}>
                <Text style={styles.textStyle}>Crypto News</Text>
            </View>
            <LottieView source={require("../../assets/animations/announcement-animation.json")}
                autoPlay
                speed={0.8}
                loop={true}
                style={styles.lottieStyle} />
            <View>
                <Text style={styles.headerTitleTextStyle}>About to Launch.</Text>
                <Text style={[styles.headerSubTitleTextStyle, { marginTop: 20 }]}>
                    We are going to launch the crypto news of your favourites crypto currencies soon.</Text>
            </View>
        </View>
    );
}

export default CryptoNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    noWatchlistHeaderContainer: {
        paddingTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    textStyle: {
        marginLeft: 10,
        fontSize: 23,
        fontWeight: "bold",
        color: "#000000"
    },
    lottieStyle: {
        marginTop: 30,
        width: "100%",
        height: 300,
        alignSelf: "center"
    },
    headerTitleTextStyle: {
        marginTop: 50,
        alignSelf: "center",
        fontSize: 27,
        fontWeight: "bold",
        color: "#000000"
    },
    headerSubTitleTextStyle: {
        width: 300,
        alignSelf: "center",
        fontSize: 16.5,
        fontWeight: "500",
        color: "#8694a1",
        textAlign: "center"
    }
});