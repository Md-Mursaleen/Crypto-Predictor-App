import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { normalize } from '../components/theme';
import { NEWS_API_URL } from '../../utilis/env';
import NewsItem from '../components/NewsItem';

const CryptoNewsScreen = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(NEWS_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const responseData = await response.json();
            if (responseData.data) {
                setNewsData(responseData.data);
            } else {
                setError('No news available at the moment.');
            }
        } catch (error) {
            setError(`Failed to load news. Please check your network connection.`);
            console.log('Error while fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>Top Crypto News</Text>
            </View>
            {loading && newsData.length === 0 ? (
                <ActivityIndicator size='large' color='#FFFFFF' />
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorTextStyle}>{error}</Text>
                </View>
            ) : (
                <FlatList data={newsData}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => <NewsItem item={item} />}
                    refreshControl={
                        <RefreshControl refreshing={loading} tintColor='#000000' onRefresh={fetchData} />
                    }
                    style={styles.flatListStyle} />
            )}
        </View>
    );
}

export default CryptoNewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141323',
    },
    headerContainer: {
        paddingTop: normalize(45),
        marginLeft: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTextStyle: {
        paddingBottom: normalize(5),
        marginLeft: normalize(10),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#FFFFFF',
    },
    flatListStyle: {
        flex: 1,
        marginTop: normalize(5),
        marginBottom: normalize(15),
    },
    errorContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#FF6B6B',
    },
});