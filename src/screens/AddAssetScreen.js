import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { portfolioassetsinstore } from "../atoms/PortfolioAssets";
import { getCoins, getCryptoData } from "../service/requests";
import { useRecoilState } from "recoil";
import uuid from "react-native-uuid";
import Ionicons from "react-native-vector-icons/Ionicons";
import SearchableDropdown from "react-native-searchable-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddAssetScreen = () => {
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [assetQuantity, setAssetQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [assetsinStore, setAssetsinStore] = useRecoilState(portfolioassetsinstore);
    const navigation = useNavigation();
    const addnewAsset = async () => {
        const newAsset = {
            id: selectedCoinData?.id,
            uniqueid: selectedCoinData?.id + uuid.v4(),
            name: selectedCoinData?.name,
            image: selectedCoinData?.image?.small,
            symbol: selectedCoinData?.symbol.toUpperCase(),
            price: selectedCoinData?.market_data?.current_price?.usd,
            quantity: parseFloat(assetQuantity)
        };
        const newAssets = [...assetsinStore, newAsset];
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem("@portfolio_crypto", jsonData);
        setAssetsinStore(newAssets);
        navigation.goBack("Portfolio");
    };
    const fetchCoins = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coins = await getCoins();
        setCoins(coins);
        setLoading(false);
    };
    const fetchCoinData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const coinData = await getCryptoData(selectedCoin);
        setSelectedCoinData(coinData);
        setLoading(false);
    };
    useEffect(() => {
        fetchCoins();
    }, []);
    useEffect(() => {
        if (selectedCoin) {
            fetchCoinData();
        }
    }, [selectedCoin]);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name="chevron-back-sharp" size={25} color="#636b77" onPress={() => navigation.goBack()} style={{ marginLeft: 10 }} />
                <Text style={styles.headerText}>Add New Asset</Text>
            </View>
            <SearchableDropdown containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownitemContainer}
                itemTextStyle={{ color: "grey" }}
                items={coins}
                onItemSelect={(item) => setSelectedCoin(item.id)}
                resetValue={false}
                placeholder={selectedCoin || "Select a crypto coin"}
                placeholderTextColor="grey"
                textInputProps={{
                    underlineColorAndroid: "transparent",
                    style: styles.textInputPropsStyle
                }} />
            {selectedCoinData && (
                <>
                    <View style={styles.quantityContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <TextInput value={assetQuantity} placeholder="0" placeholderTextColor="#cdcdcd"
                                keyboardType="numeric"
                                style={styles.textInputStyle}
                                onChangeText={setAssetQuantity} />
                            <Text style={styles.symbolTextStyle}>{selectedCoinData?.symbol.toUpperCase()}</Text>
                        </View>
                        <Text style={styles.priceTextStyle}>{selectedCoinData?.market_data?.current_price?.usd} per coin</Text>
                    </View>
                    <Pressable style={[styles.buttonContainer, { backgroundColor: assetQuantity === "" ? "#cdcdcd" : "#4169e1" }]}
                        onPress={addnewAsset} disabled={assetQuantity === ""} >
                        <Text style={styles.buttonText}>Add New Asset</Text>
                    </Pressable>
                </>
            )}
        </View>
    );
}

export default AddAssetScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    headerText: {
        marginLeft: "28%",
        fontSize: 16.5,
        fontWeight: "600",
        color: "#636b77"
    },
    dropdownContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: "100%",
        backgroundColor: "white"
    },
    dropdownitemContainer: {
        padding: 16,
        marginTop: 10,
        backgroundColor: "#f4f4f4",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "grey",
        borderRadius: 5
    },
    textInputPropsStyle: {
        padding: 12,
        backgroundColor: "#f4f4f4",
        color: "grey",
        borderWidth: 1.5,
        borderColor: "grey",
        borderRadius: 5
    },
    quantityContainer: {
        flex: 1,
        marginTop: -120,
        alignItems: "center"
    },
    textInputStyle: {
        fontSize: 70,
        color: "black"
    },
    symbolTextStyle: {
        marginTop: 15,
        marginLeft: 5,
        fontSize: 20,
        fontWeight: "700",
        color: "black"
    },
    priceTextStyle: {
        fontSize: 17,
        fontWeight: "600",
        color: "black"
    },
    buttonContainer: {
        padding: 10,
        marginVertical: 25,
        marginHorizontal: 10,
        alignItems: "center",
        borderRadius: 5
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "600",
        color: "white"
    }
});