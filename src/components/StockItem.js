import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { normalize } from './theme';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const StockItem = ({ stock }) => {
    const navigation = useNavigation();

    const handelPressItem = () => {
        navigation.navigate('StockDetails', { ticker: stock.ticker, percentageChange: stock.priceChangePercentage });
    };

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '..' : string;
    };

    return (
        <TouchableOpacity onPress={handelPressItem} style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: stock.image }} style={styles.imageStyle} />
            </View>
            <View style={{ marginTop: normalize(15) }}>
                <Text style={styles.stockNameTextStyle}>{stock.companyName} ({stock.ticker})</Text>
                <View style={styles.infoContainer}>
                    <Text style={styles.stockPriceTextStyle}>${stock.price}</Text>
                    <View style={styles.percentageChangeContainer}>
                        <AntDesign name={parseFloat(stock.priceChangePercentage) > 0 ? 'caretup' : 'caretdown'}
                            color={parseFloat(stock.priceChangePercentage) > 0 ? '#6AC77E' : '#D0585C'} size={10} style={styles.iconStyle} />
                        <Text style={[styles.percentageChangeTextStyle, { color: parseFloat(stock.priceChangePercentage) > 0 ? '#6AC77E' : '#D0585C' }]}>
                            {parseFloat(stock.priceChangePercentage).toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        padding: normalize(10),
        margin: normalize(5),
        width: 'auto',
        height: 'auto',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: '#141323',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEEEEE',
        borderRadius: 5,
        elevation: 1,
    },
    imageContainer: {
        width: normalize(56),
        height: normalize(56),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CDCDCD',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#CDCDCD',
        borderRadius: 50,
    },
    imageStyle: {
        width: normalize(40),
        height: normalize(40),
        resizeMode: 'contain',
        borderRadius: 50,
    },
    stockNameTextStyle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
    },
    infoContainer: {
        marginTop: normalize(5),
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    stockPriceTextStyle: {
        marginBottom: normalize(5),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#FFFFFF',
    },
    percentageChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconStyle: {
        marginRight: normalize(5),
        alignSelf: 'center',
    },
    percentageChangeTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
    },
});

export default StockItem;
