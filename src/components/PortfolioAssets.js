import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRecoilValue, useRecoilState } from 'recoil';
import { portfolioassets } from '../atoms/PortfolioAssets';
import { SwipeListView } from 'react-native-swipe-list-view';
import { portfolioassetsinstore } from '../atoms/PortfolioAssets';
import { normalize } from '../components/theme';
import PortfolioAssetItem from './PortfolioAssetItem';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const PortfolioAssets = () => {
    const navigation = useNavigation();
    const assets = useRecoilValue(portfolioassets);
    const [storedAssets, setStoredAssets] = useRecoilState(portfolioassetsinstore);

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
        const newAssets = storedAssets.filter((crypto) => crypto.uniqueid !== asset.item.uniqueid);
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem('@portfolio_crypto', jsonData);
        setStoredAssets(newAssets);
    };

    const deletebutton = (data) => {
        return (
            <Pressable style={styles.deleteButtonContainer} onPress={() => deletingAsset(data)}>
                <FontAwesome name='trash-o' size={24} color='#ffffff' />
            </Pressable>
        );
    };

    return (
        assets?.length === 0 ? (
            <>
                <Text style={styles.textStyle}>Portfolio</Text>
                <LottieView source={require('../../assets/animations/searching-animation.json')}
                    autoPlay
                    speed={2.0}
                    loop={true}
                    style={styles.lottieStyle} />
                <View>
                    <Text style={styles.headerTitleTextStyle}>Your portfolio is empty</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(18) }]}>
                        Add the first asset by tapping on the</Text>
                    <Text style={[styles.headerSubTitleTextStyle, { marginTop: normalize(5) }]}>
                        button below.</Text>
                </View>
                <Pressable onPress={() => navigation.navigate('AddAsset')}
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
                                { color: currentValue() >= 0 ? '#6ac77e' : '#d0585c' }]}>${currentValue()} (24h)</Text>
                            </View>
                            <View style={[styles.percentageChangeContainer,
                            { backgroundColor: currentValue() >= 0 ? '#6ac77e' : '#d0585c' }]}>
                                <AntDesign name={currentValue() >= 0 ? 'caretup' : 'caretdown'} color='#ffffff'
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
                                <AntDesign name='caretdown' color='#5e80fc' size={12} />
                            </View>
                        </View>
                    </>
                }
                ListFooterComponent={
                    <Pressable onPress={() => navigation.navigate('AddAsset')}
                        style={styles.buttonContainer} >
                        <Text style={styles.buttonTextStyle}>Add New Asset</Text>
                    </ Pressable>
                } />
        )
    );
}

export default PortfolioAssets;

const styles = StyleSheet.create({
    textStyle: {
        marginLeft: normalize(15),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
    },
    lottieStyle: {
        marginTop: normalize(60),
        height: normalize(170),
        alignSelf: 'center',
    },
    headerTitleTextStyle: {
        marginTop: normalize(80),
        fontSize: 26,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        alignSelf: 'center',
        color: '#d6d6d8',
    },
    headerSubTitleTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        alignSelf: 'center',
        color: '#808b9d',
    },
    buttonContainer: {
        padding: normalize(14),
        marginHorizontal: normalize(20),
        marginTop: 'auto',
        marginBottom: normalize(20),
        alignItems: 'center',
        backgroundColor: '#0052fe',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#ffffff',
    },
    balanceContainer: {
        marginTop: normalize(15),
        marginBottom: normalize(5),
        marginHorizontal: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    balanceTextStyle: {
        marginLeft: normalize(4),
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#5e80fc',
    },
    balanceValueTextStyle: {
        marginTop: normalize(5),
        marginLeft: normalize(3.5),
        fontSize: 28,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#d6d6d8',
    },
    changePriceTextStyle: {
        marginTop: normalize(4),
        marginLeft: normalize(5),
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
    },
    percentageChangeContainer: {
        paddingHorizontal: normalize(5),
        paddingVertical: normalize(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    iconStyle: {
        marginRight: normalize(5),
        alignSelf: 'center',
    },
    percentageChangeTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#ffffff',
    },
    assetsTextStyle: {
        paddingVertical: normalize(20),
        marginLeft: normalize(13),
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#d6d6d8',
    },
    headerContainer: {
        marginHorizontal: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        marginRight: normalize(5),
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#5e80fc',
    },
    headerItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deleteButtonContainer: {
        flex: 1,
        paddingRight: normalize(28),
        marginLeft: normalize(20),
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#ea3943',
    },
});