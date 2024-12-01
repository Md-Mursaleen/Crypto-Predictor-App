import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Modal, TextInput, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { normalize } from '../components/theme';
import { STOCK_BASE_URL, STOCK_API_KEY } from '../../utilis/env';
import { SYMBOLS } from '../../utilis/symbols';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const screenWidth = Dimensions.get('window').width;

const getIntervals = () => {
    const today = moment();
    return {
        '1W': { serietype: 'line', range: { from: today.clone().subtract(1, 'weeks').format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') } },
        '1M': { serietype: 'line', range: { from: today.clone().subtract(1, 'months').format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') } },
        '3M': { serietype: 'line', range: { from: today.clone().subtract(3, 'months').format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') } },
        '6M': { serietype: 'line', range: { from: today.clone().subtract(6, 'months').format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') } },
        '1Y': { serietype: 'line', range: { from: today.clone().subtract(1, 'years').format('YYYY-MM-DD'), to: today.format('YYYY-MM-DD') } },
    };
};

const StockDetailsScreen = ({ route }) => {
    const { ticker: initialTicker, percentageChange } = route.params;
    const [ticker, setTicker] = useState(initialTicker);
    const [stockData, setStockData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interval, setInterval] = useState('1M');
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    const intervals = getIntervals();

    const fetchCompanyData = async (ticker) => {
        try {
            setLoading(true);

            const response = await fetch(`${STOCK_BASE_URL}profile/${ticker}?apikey=${STOCK_API_KEY}`);
            const data = await response.json();

            if (data && data.length > 0) {
                setStockData(data[0]);
            } else {
                setError('No company data found.');
            }
        } catch (err) {
            setError(err.message || 'Error fetching company details.');
        }
    };

    const fetchHistoricalData = async (ticker, selectedInterval) => {
        try {
            setLoading(true);
            const { from, to, serietype } = selectedInterval.range;

            const response = await fetch(
                `${STOCK_BASE_URL}historical-price-full/${ticker}?from=${from}&to=${to}&serietype=${serietype}&apikey=${STOCK_API_KEY}`
            );
            const data = await response.json();
            if (data && data.historical && Array.isArray(data.historical)) {
                setHistoricalData(data.historical.reverse());
            } else {
                setHistoricalData([]);
                setError('No historical data found.');
            }
        } catch (error) {
            setError(error.message || 'Error fetching historical data.');
        }
    };

    // const fetchStockDetails = async (ticker) => {
    //     try {
    //         setLoading(true);

    //         const response = await fetch(`${STOCK_BASE_URL}${ticker}?apikey=${STOCK_API_KEY}`);
    //         const data = await response.json();

    //         if (data && data.length > 0) {
    //             const stockDetails = data[0];
    //             setStockData({
    //                 ticker: stockDetails.symbol,
    //                 companyName: stockDetails.name,
    //                 price: stockDetails.price || 0,
    //                 priceChangePercentage: stockDetails.changesPercentage || 0,
    //                 priceChange: stockDetails.change || 0,
    //                 image: `https://financialmodelingprep.com/image-stock/${stockDetails.symbol}.png`,
    //                 marketCap: stockDetails.marketCap,
    //                 historicalData: stockDetails.historicalData || [],
    //             });
    //         } else {
    //             setError('No stock data found');
    //         }
    //     } catch (err) {
    //         setError(err.message || 'Error fetching stock details');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSearch = (text) => {
        setQuery(text);
        if (text.length > 2) {
            const filteredResults = SYMBOLS.filter((symbol) =>
                symbol.toLowerCase().includes(text.toLowerCase())
            );
            setSearchResults(filteredResults);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleSelectStock = (selectedTicker) => {
        setTicker(selectedTicker);
        setShowResults(false);
        setQuery('');
    };

    useEffect(() => {
        fetchCompanyData(ticker);
        fetchHistoricalData(ticker, intervals[interval]);
        setLoading(false);
    }, [ticker, interval]);

    if (loading) {
        return <ActivityIndicator style={styles.loaderStyle} size='large' color='#FFFFFF' />;
    }

    if (error) {
        return <Text style={styles.errorTextStyle}>{error}</Text>;
    }

    const chartData = historicalData.length ?
        {
            labels: historicalData.slice(0, 6).map((item) => moment(item.date).format('DD/MM') || ''),
            datasets: [
                {
                    data: historicalData.map((item) => item.close || 0),
                },
            ],
        }
        : {
            labels: ['No Data'],
            datasets: [{ data: [0] }],
        };

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '..' : string;
    }

    const cryptoMarketCap = (market_cap) => {
        if (market_cap > 1e12) {
            return `${(market_cap / 1e12).toFixed(2)} Tn`;
        }
        if (market_cap > 1e9) {
            return `${(market_cap / 1e9).toFixed(2)} Bn`;
        }
        if (market_cap > 1e6) {
            return `${(market_cap / 1e6).toFixed(2)} Mn`;
        }
        if (market_cap > 1e3) {
            return `${(market_cap / 1e3).toFixed(2)} K`;
        }
        return market_cap;
    };

    const handleCloseModal = () => {
        setShowResults(false);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput placeholder='Search Stocks'
                    placeholderTextColor={'#EEEEEE'}
                    value={query}
                    onChangeText={handleSearch}
                    style={styles.searchTextInputStyle} />
            </View>
            <Modal visible={showResults}
                animationType='slide'
                transparent={true}>
                <TouchableWithoutFeedback onPress={() => handleCloseModal()}>
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContentContainer}>
                                <FlatList data={searchResults}
                                    keyExtractor={(item) => item.symbol}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => handleSelectStock(item.symbol)}>
                                            <Text style={styles.searchResultsStyle}>{item.name} ({item.symbol})</Text>
                                        </TouchableOpacity>
                                    )} />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
            <View style={styles.headerContainer}>
                <View style={styles.headerSubContainer}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: stockData?.image }} style={styles.imageStyle} />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.nameTextStyle}>{stockData?.companyName.toUpperCase()}</Text>
                        <Text style={styles.tickerTextStyle}>{stockData?.symbol}, {stockData?.currency}</Text>
                        <Text style={styles.exchangeTextStyle}>{stockData?.exchange}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.priceTextStyle}>${stockData?.price.toFixed(2)}</Text>
                    <View style={styles.percentageChangeContainer}>
                        <AntDesign name={parseFloat(percentageChange) > 0 ? 'caretup' : 'caretdown'}
                            color={parseFloat(percentageChange) > 0 ? '#6AC77E' : '#D0585C'} size={10} style={styles.iconStyle} />
                        <Text style={[styles.percentageChangeTextStyle, { color: parseFloat(percentageChange) > 0 ? '#6AC77E' : '#D0585C' }]}>
                            {parseFloat(percentageChange).toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
            <View style={styles.lineChartContainer}>
                <LineChart data={chartData}
                    width={screenWidth - 40}
                    height={260}
                    yAxisLabel='$'
                    chartConfig={{
                        backgroundColor: '#141323',
                        backgroundGradientFrom: '#141323',
                        backgroundGradientTo: '#141323',
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(108, 122, 137, ${opacity})`,
                        labelColor: () => '#FFFFFF',
                        propsForDots: {
                            r: '0',
                            strokeWidth: '2',
                            stroke: '#ffffff',
                        },
                        propsForBackgroundLines: {
                            strokeDasharray: '',
                        },
                    }}
                    bezier
                    style={{ marginVertical: normalize(10) }} />
                <View style={styles.filterContainer}>
                    {Object?.keys(intervals).map(key => (
                        <TouchableOpacity key={key} onPress={() => setInterval(key)}
                            style={[styles.filterButtonContainer, interval === key && { backgroundColor: '#5E80FC' }]}>
                            <Text style={styles.filterKeyTextStyle}>{key}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.companyNameTextStyle}>About {stockData?.companyName.toUpperCase()}</Text>
                <Text style={styles.descriptionTextStyle}>{stockData?.description}</Text>
                <View style={styles.detailsSubContainer}>
                    <View style={styles.detailSubContainer}>
                        <Text style={styles.detailTextStyle}>Industry: {truncate(stockData?.industry, 15)}</Text>
                    </View>
                    <View style={styles.detailSubContainer}>
                        <Text style={styles.detailTextStyle}>Sector: {truncate(stockData?.sector, 10)}</Text>
                    </View>
                </View>
                <View style={styles.detailsBottomContainer}>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Market Cap</Text>
                        <Text style={styles.valueTextStyle}>
                            ${cryptoMarketCap(Number(stockData?.mktCap))}</Text>
                    </View>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Central Index Key</Text>
                        <Text style={styles.valueTextStyle}>{stockData?.cik}</Text>
                    </View>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Beta</Text>
                        <Text style={styles.valueTextStyle}>{stockData?.beta}</Text>
                    </View>
                </View>
                <View style={[styles.detailsBottomContainer, { marginTop: normalize(15) }]}>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Last Dividend</Text>
                        <Text style={styles.valueTextStyle}>${stockData?.lastDiv}</Text>
                    </View>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Volume Average</Text>
                        <Text style={styles.valueTextStyle}>{stockData?.volAvg}</Text>
                    </View>
                    <View style={styles.bottomSubContainer}>
                        <Text style={styles.keyTextStyle}>Discounted CF</Text>
                        <Text style={styles.valueTextStyle}>${(stockData?.dcf || 0).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default StockDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141323',
    },
    headerContainer: {
        marginHorizontal: normalize(10),
        marginTop: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: normalize(60),
        height: normalize(60),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 50,
    },
    imageStyle: {
        width: normalize(40),
        height: normalize(40),
        resizeMode: 'contain',
        borderRadius: 50,
    },
    textContainer: {
        marginLeft: normalize(15),
        flexDirection: 'column',
    },
    nameTextStyle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
    },
    tickerTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#5E80FC',
    },
    exchangeTextStyle: {
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#808080',
    },
    priceTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#FFFFFF',
    },
    percentageChangeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
    },
    percentageChangeTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
    },
    lineChartContainer: {
        padding: normalize(10),
        marginHorizontal: normalize(10),
        marginTop: normalize(15),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEEEEE',
        borderRadius: 8,
    },
    detailsContainer: {
        padding: normalize(12),
        marginHorizontal: normalize(10),
        marginVertical: normalize(20),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#000000',
        borderRadius: 8,
        overflow: 'hidden',
    },
    companyNameTextStyle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
    },
    descriptionTextStyle: {
        marginTop: normalize(5),
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular',
        color: '#EEEEEE',
    },
    detailsSubContainer: {
        marginTop: normalize(18),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    detailSubContainer: {
        padding: normalize(14),
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 30,
    },
    detailTextStyle: {
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#000000',
    },
    filterContainer: {
        marginBottom: normalize(10),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    filterButtonContainer: {
        padding: normalize(10),
        marginHorizontal: normalize(4),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEEEEE',
        borderRadius: 4,
    },
    filterKeyTextStyle: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        color: '#FFFFFF',
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    errorTextStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#D0585C',
    },
    detailsBottomContainer: {
        marginTop: normalize(30),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    bottomSubContainer: {
        marginHorizontal: normalize(10),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 3,
    },
    keyTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-Regular',
        color: '#CDCDCD',
    },
    valueTextStyle: {
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
    },
    searchContainer: {
        padding: normalize(10),
        marginTop: normalize(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#141323',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#000000',
    },
    searchTextInputStyle: {
        flex: 1,
        paddingHorizontal: normalize(10),
        height: normalize(55),
        backgroundColor: '#000000',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#EEEEEE',
        borderRadius: 5,
    },
    searchResultsContainer: {
        position: 'absolute',
        top: normalize(45),
        left: normalize(0),
        right: normalize(0),
        backgroundColor: '#000000',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EEEEEE',
        borderRadius: 5,
        zIndex: 1000,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentContainer: {
        padding: normalize(20),
        width: '80%',
        backgroundColor: '#000000',
        borderRadius: 10,
    },
    searchResultsStyle: {
        padding: normalize(10),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#EEEEEE',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EEEEEE',
    },
    loaderStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
