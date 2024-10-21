import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { getCryptoCoinData } from '../service/requests';
import { normalize } from '../components/theme';
import * as NavigationBar from 'expo-navigation-bar';
import CryptoItem from '../components/CryptoItem';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CryptoHomeScreen = () => {
    const [loading, setLoading] = useState(false);
    const [cryptoCoin, setCryptoCoin] = useState([]);

    const fetchCryptoCoin = async (pagenumber) => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCryptoCoin = await getCryptoCoinData(pagenumber);
        setCryptoCoin(fetchedCryptoCoin);
        setLoading(false);
    };

    const refetchCryptoCoin = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const fetchedCryptoCoin = await getCryptoCoinData();
        setCryptoCoin(fetchedCryptoCoin);
        setLoading(false);
    };

    useEffect(() => {
        fetchCryptoCoin();
    }, []);

    useEffect(() => {
        NavigationBar.setBackgroundColorAsync('#141323');
    });

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>Markets</Text>
            </View>
            <View style={styles.subHeaderContainer}>
                <View style={styles.subHeaderItemContainer}>
                    <Text style={[styles.subHeaderTextStyle, { fontSize: 15 }]}>#</Text>
                    <AntDesign name='caretdown' color='#5e80fc' size={12} />
                </View>
                <View style={styles.subHeaderItemContainer}>
                    <Text style={styles.subHeaderTextStyle}>Market Cap</Text>
                    <AntDesign name='caretdown' color='#5e80fc' size={12}
                        style={{ marginRight: normalize(20) }} />
                </View>
                <View style={[styles.subHeaderItemContainer, { marginLeft: 15 }]}>
                    <Text style={styles.subHeaderTextStyle}>24h%</Text>
                    <AntDesign name='caretdown' color='#5e80fc' size={12}
                        style={{ marginRight: normalize(10) }} />
                </View>
                <View style={[styles.subHeaderItemContainer, { marginRight: -15 }]}>
                    <Text style={styles.subHeaderTextStyle}>Price(USD)</Text>
                    <AntDesign name='caretdown' color='#5e80fc' size={12}
                        style={{ marginRight: normalize(6) }} />
                </View>
            </View>
            <FlatList data={cryptoCoin}
                renderItem={({ item }) => (
                    <CryptoItem cryptodata={item} />
                )}
                refreshControl={
                    <RefreshControl refreshing={loading} tintColor='#000000'
                        onRefresh={refetchCryptoCoin} />
                }
                style={{ marginTop: normalize(8) }} />
        </View>
    );
}

export default CryptoHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(50),
        backgroundColor: '#141323',
    },
    headerContainer: {
        paddingHorizontal: normalize(10),
        paddingBottom: normalize(5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        marginLeft: normalize(8),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
    },
    subHeaderContainer: {
        marginTop: normalize(13),
        marginHorizontal: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subHeaderItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeaderTextStyle: {
        marginRight: normalize(5),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#d6d6d8',
    },
});