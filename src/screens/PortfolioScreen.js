import React from 'react';
import { StyleSheet, View } from 'react-native';
import { normalize } from '../components/theme';
import PortfolioAssets from '../components/PortfolioAssets';

const PortfolioScreen = () => {
    return (
        <View style={styles.container}>
            <PortfolioAssets />
        </View>
    );
}

export default PortfolioScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(50),
        backgroundColor: '#141323',
    },
});