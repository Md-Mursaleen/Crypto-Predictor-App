import axios from 'axios';
import { COINGECKO_BASE_URL } from '../../utilis/env';

export const getCryptoData = async (cryptoid) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/${cryptoid}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getCryptoCoinData = async (pagenumber = 1) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${pagenumber}&sparkline=true&price_change_percentage=24h&locale=en`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getWatchlistedCrypto = async (pagenumber = 1, cryptoids) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/markets?vs_currency=usd&ids=${cryptoids}&order=market_cap_desc&per_page=50&page=${pagenumber}&sparkline=true&price_change_percentage=24h&locale=en`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getChartData = async (cryptoid, selectedValue) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/${cryptoid}/market_chart?vs_currency=usd&days=${selectedValue}&interval=daily`);
        return response.data;

    } catch (e) {
        console.log(e);
    }
};

export const getCandleChartData = async (days = 1, cryptoid) => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/${cryptoid}/ohlc?vs_currency=usd&days=${days}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const getCoins = async () => {
    try {
        const response = await axios.get(`${COINGECKO_BASE_URL}/list?include_platform=false`)
        return response.data;
    } catch (e) {
        console.error(e);
    }
};