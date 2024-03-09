import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import LottieView from "lottie-react-native";
import NewsItem from "../components/NewsItem";

const CryptoNewsScreen = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const url =
                "https://cryptopanic.com/api/v1/posts/?auth_token=6f7215ae9854466e72b07651ae5dc0ca98e1cea5&public=true";
            try {
                if (loading) {
                    return;
                }
                setLoading(true);
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const responseData = await response.json();
                // console.log('API Response: ', responseData);
                setNewsData(responseData.results);
                setLoading(false);
            } catch (error) {
                console.log("Error while fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const refetchNewsData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const url =
            "https://cryptopanic.com/api/v1/posts/?auth_token=6f7215ae9854466e72b07651ae5dc0ca98e1cea5&public=true";
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const responseData = await response.json();
            // console.log('API Response: ', responseData);
            setNewsData(responseData.results);
            setLoading(false);
        } catch (error) {
            console.log("Error while fetching data: ", error);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>Crypto News</Text>
            </View>
            <FlatList data={newsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <NewsItem item={item} />}
                refreshControl={
                    <RefreshControl refreshing={loading} tintColor="#000000"
                        onRefresh={refetchNewsData} />
                }
                style={styles.flatListStyle} />
            {/* <LottieView source={require("../../assets/animations/announcement-animation.json")}
                autoPlay
                speed={0.8}
                loop={true}
                style={styles.lottieStyle} />
            <View>
                <Text style={styles.titleTextStyle}>About to Launch.</Text>
                <Text style={[styles.subTitleTextStyle, { marginTop: 20 }]}>
                    We are going to launch the crypto news of your favourites crypto currencies soon.</Text>
            </View> */}
        </View>
    );
}

export default CryptoNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#141323"
    },
    headerContainer: {
        paddingTop: 50,
        paddingHorizontal: 10,
        paddingBottom: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerTextStyle: {
        marginLeft: 10,
        fontSize: 23,
        fontWeight: "bold",
        color: "#ffffff"
    },
    flatListStyle: {
        flex: 1,
        marginTop: 10,
        marginBottom: 15
    },
    lottieStyle: {
        marginTop: 30,
        width: "100%",
        height: 300,
        alignSelf: "center"
    },
    titleTextStyle: {
        marginTop: 50,
        alignSelf: "center",
        fontSize: 27,
        fontWeight: "bold",
        color: "#d6d6d8"
    },
    subTitleTextStyle: {
        width: 300,
        alignSelf: "center",
        fontSize: 16.5,
        fontWeight: "500",
        color: "#808b9d",
        textAlign: "center"
    }
});