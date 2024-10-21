import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, Pressable } from 'react-native';
import { useWatchlist } from '../../src/contexts/WatchlistContext';
import { getWatchlistedCrypto } from '../service/requests'
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import CryptoItem from '../components/CryptoItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

const WatchlistScreen = () => {
    const navigation = useNavigation();
    const { cryptoId } = useWatchlist();
    const [cryptoCurrency, setCryptoCurrency] = useState([]);
    const [loading, setLoading] = useState(false);
    const formattedId = () => cryptoId.join('%2C');

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

    return (
        cryptoId?.length === 0 ? (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <LottieView source={require('../../assets/animations/watchlist-animation.json')}
                    autoPlay
                    speed={0.8}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitleTextStyle}>Your watchlist is empty</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(16) }]}>
                        Start building your watchlist by clicking</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(5) }]}>button below.</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('Markets')} style={styles.buttonContainer}>
                    <Text style={styles.buttonTextStyle}>Add New Coins</Text>
                </Pressable >
            </View>
        ) : (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.textStyle}>Watchlists</Text>
                </View>
                <View style={styles.headerSubContainer}>
                    <View style={styles.headerSubItemContainer}>
                        <Text style={[styles.subHeaderTextStyle, { fontSize: 15 }]}>#</Text>
                        <AntDesign name='caretdown' color='#5e80fc' size={12} />
                    </View>
                    <View style={styles.headerSubItemContainer}>
                        <Text style={styles.subHeaderTextStyle}>Market Cap</Text>
                        <AntDesign name='caretdown' color='#5e80fc' size={12}
                            style={{ marginRight: normalize(20) }} />
                    </View>
                    <View style={[styles.headerSubItemContainer, { marginLeft: 15 }]}>
                        <Text style={styles.subHeaderTextStyle}>24h%</Text>
                        <AntDesign name='caretdown' color='#5e80fc' size={12}
                            style={{ marginRight: normalize(10) }} />
                    </View>
                    <View style={[styles.headerSubItemContainer, { marginRight: -15 }]}>
                        <Text style={styles.subHeaderTextStyle}>Price(USD)</Text>
                        <AntDesign name='caretdown' color='#5e80fc' size={12}
                            style={{ marginRight: normalize(6) }} />
                    </View>
                </View>
                <FlatList data={cryptoCurrency} renderItem={({ item }) => (
                    <CryptoItem cryptodata={item} />
                )} refreshControl={
                    <RefreshControl refreshing={loading} tintColor='#000000'
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
        backgroundColor: '#141323',
    },
    headerContainer: {
        marginTop: normalize(50),
        marginLeft: normalize(10),
    },
    textStyle: {
        marginLeft: normalize(10),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
    },
    lottieStyle: {
        marginTop: normalize(60),
        width: normalize(100),
        height: normalize(185),
        alignSelf: 'center',
    },
    headerTitleTextStyle: {
        marginTop: normalize(70),
        fontSize: 26,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#d6d6d8',
        textAlign: 'center',
    },
    headerSubTitleTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#808b9d',
        textAlign: 'center',
    },
    buttonContainer: {
        padding: normalize(14),
        marginTop: 'auto',
        marginBottom: normalize(25),
        marginHorizontal: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052fe',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#ffffff',
    },
    headerSubContainer: {
        marginTop: normalize(13),
        marginHorizontal: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSubItemContainer: {
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