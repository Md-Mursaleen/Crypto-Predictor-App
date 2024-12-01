import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { normalize } from './theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CryptoItem = ({ cryptodata }) => {
    const navigation = useNavigation();
    const { id, symbol, image, current_price, market_cap_rank, market_cap,
        price_change_percentage_24h, sparkline_in_7d } = cryptodata;

    const cryptoMarketCap = (market_cap) => {
        if (market_cap > 1e12) {
            return `${(market_cap / 1e12).toFixed(3)} Tn`;
        }
        if (market_cap > 1e9) {
            return `${(market_cap / 1e9).toFixed(3)} Bn`;
        }
        if (market_cap > 1e6) {
            return `${(market_cap / 1e6).toFixed(3)} Mn`;
        }
        if (market_cap > 1e3) {
            return `${(market_cap / 1e3).toFixed(3)} K`;
        }
        return market_cap;
    }

    const pricePercentage = price_change_percentage_24h < 0 ? '#D0585C' : '#6AC77E';

    return (
        <Pressable onPress={() => navigation.navigate('CryptoDetails', { cryptoid: id })}
            style={styles.cryptoContainer}>
            <Text style={styles.positionTextStyle}>{market_cap_rank}</Text>
            <Image source={{ uri: image }} style={styles.imageStyle} />
            <View>
                <Text style={styles.symbolTextSytle}>{symbol?.toUpperCase()}</Text>
                <Text style={styles.marketCapTextStyle}>{cryptoMarketCap(market_cap)}</Text>
            </View>
            <View style={styles.percentageChangeGraphContainer}>
                <LineChart withHorizontalLabels={false}
                    withVerticalLabels={false}
                    withDots={false}
                    withInnerLines={false}
                    withOuterLines={false}
                    withVerticalLines={false}
                    data={{
                        datasets: [
                            {
                                data: sparkline_in_7d?.price
                            }
                        ]
                    }}
                    width={120}
                    height={48}
                    chartConfig={{
                        backgroundGradientFrom: '#141323',
                        backgroundGradientTo: '#141323',
                        color: () => pricePercentage
                    }}
                    bezier
                    style={{ paddingRight: 0, paddingTop: 0 }} />
            </View>
            <View style={styles.priceValueContainer}>
                <Text style={styles.priceTextStyle}>{current_price === 1 ? '1.00' : current_price < 1
                    ? (current_price).toFixed(5) : current_price}$</Text>
                <View style={styles.pricePercentageContainer}>
                    <AntDesign name={price_change_percentage_24h > 0 ? 'caretup' : 'caretdown'}
                        color={pricePercentage} size={10} style={styles.iconStyle} />
                    <Text style={[styles.priceChangeTextStyle, { color: pricePercentage }]}>
                        {price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>
        </Pressable>
    );
}

export default CryptoItem;

const styles = StyleSheet.create({
    cryptoContainer: {
        padding: normalize(13),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#141323',
    },
    positionTextStyle: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Mukta-SemiBold',
        color: '#7C7B7E',
    },
    imageStyle: {
        marginLeft: normalize(23),
        marginRight: normalize(10),
        height: normalize(28),
        width: normalize(28),
    },
    symbolTextSytle: {
        marginRight: normalize(5),
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#D2D1D4',
    },
    marketCapTextStyle: {
        marginTop: normalize(2),
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#7C7B7E',
    },
    percentageChangeGraphContainer: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceValueContainer: {
        marginRight: normalize(4),
        marginLeft: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
    },
    priceTextStyle: {
        marginLeft: normalize(2),
        marginBottom: normalize(2),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#D6D6D8',
    },
    pricePercentageContainer: {
        width: normalize(65),
        height: normalize(26),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    iconStyle: {
        marginRight: normalize(5),
        alignSelf: 'center',
    },
    priceChangeTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
    },
});