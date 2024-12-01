import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import { STOCK_BASE_URL, STOCK_API_KEY } from '../../utilis/env';
import { SYMBOLS } from '../../utilis/symbols';
import StockItem from '../components/StockItem';

// const StockList = ({ data, refreshing, onRefresh }) => (
//     <FlatList data={data}
//         keyExtractor={(item) => item.ticker}
//         renderItem={({ item }) => <StockItem stock={item} />}
//         numColumns={2}
//         columnWrapperStyle={{ justifyContent: 'space-between' }}
//         contentContainerStyle={styles.contentContainerStyle}
//         refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         } />
// );

const StockHomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [stocksData, setStocksData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const PAGE_SIZE = 30;

    const fetchStocksData = async (isRefreshing = false) => {
        try {
            if (loading) return;
            setLoading(true);
            const symbolsBatch = SYMBOLS.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

            if (symbolsBatch.length === 0) {
                setHasMore(false);
                return;
            }

            const URL = `${STOCK_BASE_URL}${'quote/'}${symbolsBatch.join(',')}${'?apikey='}${STOCK_API_KEY}`;

            const response = await fetch(URL);
            const data = await response.json();

            const formattedData = data.map((item) => ({
                ticker: item.symbol,
                companyName: item.name,
                price: item.price || 0,
                priceChangePercentage: item.changesPercentage || 0,
                priceChange: item.change || 0,
                image: `https://financialmodelingprep.com/image-stock/${item.symbol}.png`,
            }));

            if (isRefreshing) {
                setStocksData(formattedData);
                setPage(1);
            } else {
                setStocksData((prevStocks) => [...prevStocks, ...formattedData]);
                setPage((prevPage) => prevPage + 1);
            }

            if (symbolsBatch.length < PAGE_SIZE) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching stocks data:', error);
        } finally {
            setLoading(false);
            if (isRefreshing) setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchStocksData();
    }, []);

    const handleRefresh = async () => {
        setRefreshing(true);
        setHasMore(true);
        fetchStocksData(true);
    };

    const handleLoadMore = () => {
        if (!hasMore || loading) return;
        fetchStocksData(false);
    };

    // if (loading) {
    //     return <ActivityIndicator style={styles.loadingStyle} size='large' color='#FFFFFF' />;
    // }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>Stocks</Text>
            </View>
            <FlatList data={stocksData}
                keyExtractor={(item) => item.ticker}
                renderItem={({ item }) => <StockItem stock={item} />}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={styles.contentContainerStyle}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loading && !refreshing ? <ActivityIndicator size='large' color='#FFFFFF' /> : null
                }
            />
        </View>
    );
}

export default StockHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141323',
    },
    headerContainer: {
        marginTop: normalize(45),
        marginLeft: normalize(10),
        paddingBottom: normalize(5),
    },
    headerTextStyle: {
        marginLeft: normalize(10),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#FFFFFF',
    },
    contentContainerStyle: {
        paddingVertical: normalize(15),
        paddingHorizontal: normalize(10),
    },
    loadingStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});