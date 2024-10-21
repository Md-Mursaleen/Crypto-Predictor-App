import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { portfolioassetsinstore } from '../atoms/PortfolioAssets';
import { getCoins, getCryptoData } from '../service/requests';
import { useRecoilState } from 'recoil';
import { normalize } from '../components/theme';
import uuid from 'react-native-uuid';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddAssetScreen = () => {
    const navigation = useNavigation();
    const [coins, setCoins] = useState([]);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedCoinData, setSelectedCoinData] = useState(null);
    const [assetQuantity, setAssetQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [assetsinStore, setAssetsinStore] = useRecoilState(portfolioassetsinstore);

    const addnewAsset = async () => {
        const newAsset = {
            id: selectedCoinData?.id,
            uniqueid: selectedCoinData?.id + uuid.v4(),
            name: selectedCoinData?.name,
            image: selectedCoinData?.image?.small,
            symbol: selectedCoinData?.symbol.toUpperCase(),
            price: selectedCoinData?.market_data?.current_price?.usd,
            quantity: parseFloat(assetQuantity),
        };
        const newAssets = [...assetsinStore, newAsset];
        const jsonData = JSON.stringify(newAssets);
        await AsyncStorage.setItem('@portfolio_crypto', jsonData);
        setAssetsinStore(newAssets);
        navigation.goBack('Portfolio');
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
                <Ionicons name='chevron-back-sharp' size={25} color='#d6d6d8'
                    onPress={() => navigation.goBack()} style={{ marginLeft: 10 }} />
                <Text style={styles.headerTextStyle}>Add New Asset</Text>
            </View>
            <SearchableDropdown containerStyle={styles.dropdownContainer}
                itemStyle={styles.dropdownitemContainer}
                itemTextStyle={styles.dropdownItemTextStyle}
                items={coins}
                onItemSelect={(item) => setSelectedCoin(item.id)}
                resetValue={false}
                placeholder={selectedCoin || 'Select your crypto coin'}
                placeholderTextColor='#262626'
                textInputProps={{
                    underlineColorAndroid: 'transparent',
                    style: styles.textInputPropsStyle
                }} />
            {selectedCoinData && (
                <>
                    <View style={styles.quantityContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput value={assetQuantity} placeholder='0'
                                placeholderTextColor='#cdcdcd'
                                keyboardType='numeric'
                                style={styles.textInputStyle}
                                onChangeText={setAssetQuantity} />
                            <Text style={[styles.symbolTextStyle, { color: assetQuantity === '' ? '#ffffff' : '#5e80fc' }]}>
                                {selectedCoinData?.symbol.toUpperCase()}</Text>
                        </View>
                        <Text style={[styles.priceTextStyle, { color: assetQuantity === '' ? '#ffffff' : '#5e80fc' }]}>
                            {selectedCoinData?.market_data?.current_price?.usd} per coin</Text>
                    </View>
                    <Pressable onPress={addnewAsset} disabled={assetQuantity === ''}
                        style={[styles.buttonContainer, { backgroundColor: assetQuantity === '' ? '#cdcdcd' : '#0052fe' }]} >
                        <Text style={styles.buttonTextStyle}>Add New Asset</Text>
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
        paddingTop: normalize(50),
        backgroundColor: '#141323',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextStyle: {
        marginLeft: '28%',
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#d6d6d8',
    },
    dropdownContainer: {
        flex: 1,
        paddingHorizontal: normalize(10),
        paddingVertical: normalize(20),
        width: '100%',
        backgroundColor: '#141323',
    },
    dropdownitemContainer: {
        padding: normalize(16),
        marginTop: normalize(10),
        backgroundColor: '#f8f8fa',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ffffff',
        borderRadius: 5,
    },
    dropdownItemTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#262626',
    },
    textInputPropsStyle: {
        padding: normalize(12),
        backgroundColor: '#f8f8fa',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#262626',
        borderWidth: 1.5,
        borderColor: '#ffffff',
        borderRadius: 5,
    },
    quantityContainer: {
        flex: 1,
        marginTop: normalize(-120),
        alignItems: 'center',
    },
    textInputStyle: {
        width: '12%',
        fontSize: 75,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#ffffff',
    },
    symbolTextStyle: {
        marginTop: normalize(15),
        marginLeft: normalize(5),
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
    },
    priceTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
    },
    buttonContainer: {
        padding: normalize(14),
        marginHorizontal: normalize(20),
        marginTop: 'auto',
        marginBottom: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
        color: '#ffffff',
    },
});