import React, { useEffect, useState, useRef } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image, Dimensions, Pressable, Animated } from 'react-native';
import { getCryptoCoinData } from '../service/requests';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import CryptoItem from '../components/CryptoItem';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MenuDrawer from '../components/MenuDrawer';

const { width } = Dimensions.get('window');

const CryptoHomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [cryptoCoin, setCryptoCoin] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const drawerAnimation = useRef(new Animated.Value(-width)).current;

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

    const openDrawer = () => {
        setDrawerVisible(true);
        Animated.timing(drawerAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnimation, {
            toValue: -width,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            setDrawerVisible(false);
        });
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTextStyle}>Cryptos</Text>
                    <Pressable onPress={openDrawer}>
                        <Image source={require('../../assets/images/profile-pic.png')}
                            style={styles.profileImageStyle} />
                    </Pressable>
                </View>
                <View style={styles.subHeaderContainer}>
                    <View style={styles.subHeaderItemContainer}>
                        <Text style={[styles.subHeaderTextStyle, { fontSize: 15 }]}>#</Text>
                        <AntDesign name='caretdown' color='#5E80FC' size={12} />
                    </View>
                    <View style={styles.subHeaderItemContainer}>
                        <Text style={styles.subHeaderTextStyle}>Market Cap</Text>
                        <AntDesign name='caretdown' color='#5E80FC' size={12} style={{ marginRight: 20 }} />
                    </View>
                    <View style={[styles.subHeaderItemContainer, { marginLeft: 15 }]}>
                        <Text style={styles.subHeaderTextStyle}>24h%</Text>
                        <AntDesign name='caretdown' color='#5E80FC' size={12} style={{ marginRight: 10 }} />
                    </View>
                    <View style={[styles.subHeaderItemContainer, { marginRight: -15 }]}>
                        <Text style={styles.subHeaderTextStyle}>Price(USD)</Text>
                        <AntDesign name='caretdown' color='#5E80FC' size={12} style={{ marginRight: 5 }} />
                    </View>
                </View>
                <FlatList data={cryptoCoin}
                    renderItem={({ item }) => (
                        <CryptoItem cryptodata={item} />
                    )}
                    refreshControl={
                        <RefreshControl refreshing={loading} tintColor='#000000' onRefresh={refetchCryptoCoin} />
                    }
                    style={{ marginTop: normalize(8) }} />
            </View>
            {drawerVisible && (
                <>
                    <Pressable onPress={closeDrawer} style={styles.overlayContainer} />
                    <Animated.View style={[styles.drawerStyle, { transform: [{ translateX: drawerAnimation }] }]}
                        pointerEvents='box-none'>
                        <MenuDrawer closeDrawer={closeDrawer} />
                    </Animated.View>
                </>
            )}
        </>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        marginLeft: normalize(8),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#FFFFFF',
    },
    profileImageStyle: {
        marginRight: normalize(8),
        width: normalize(38),
        height: normalize(38),
        resizeMode: 'contain',
        borderRadius: 50,
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
        color: '#D6D6D8',
    },
    overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#00000080',
        zIndex: 100,
    },
    drawerStyle: {
        position: 'absolute',
        padding: 20,
        left: 0,
        top: 0,
        bottom: 0,
        width: width * 0.90,
        backgroundColor: '#141323',
        zIndex: 101,
    },
});