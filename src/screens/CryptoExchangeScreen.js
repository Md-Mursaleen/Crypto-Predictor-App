import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CoinsExchangeScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const isBuy = route?.params?.isBuy;
    const { symbol, image, market_data: { current_price: { usd } } } = route?.params?.cryptoCoin;
    const [coinUSDValue, setCoinUSDValue] = useState('');
    const [coinAmount, setCoinAmount] = useState('');
    useEffect(() => {
        const amount = parseFloat(coinAmount);
        if (!amount && amount !== 0) {
            setCoinAmount('');
            setCoinUSDValue('');
            return;
        }
        setCoinUSDValue((amount * usd).toString());
    }, [coinAmount]);
    const onPressedPlaceOrder = () => {
        Alert.alert('Hey', 'Your order has been placed',
            [{
                text: 'Go Home',
                onPress: () => navigation.navigate('BottomTab')
            }]);
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons name='chevron-back-sharp' size={25} color='#636B77' onPress={() => navigation.goBack()}
                    style={{ marginLeft: -8 }} />
                <Text style={styles.headerTextStyle}>Coin Exchange</Text>
            </View>
            <View style={styles.informationContainer}>
                <Image source={{ uri: image.small }} style={styles.coinImageStyle} />
                <Text style={styles.symbolTextStyle}>{symbol.toUpperCase()}</Text>
            </View>
            <Text style={[styles.subTitleTextStyle, { color: isBuy ? '#26B985' : '#C14850' }]}
            >1{symbol.toUpperCase()}{' = '}{'$'}{usd}</Text>
            <Image source={require('../../assets/images/order-image.jpg')}
                style={styles.imageStyle} />
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='0'
                        placeholderTextColor={'#A7A7A7'}
                        keyboardType='number-pad'
                        value={coinAmount}
                        onChangeText={setCoinAmount}
                        style={styles.textInputStyle} />
                    <Text style={styles.inputTextStyle}>{symbol.toUpperCase()}</Text>
                </View>
                <Text style={styles.textStyle}>{'='}</Text>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='0'
                        placeholderTextColor={'#A7A7A7'}
                        keyboardType='number-pad'
                        value={coinUSDValue}
                        onChangeText={setCoinUSDValue}
                        style={styles.textInputStyle} />
                    <Text style={styles.inputTextStyle}>USD</Text>
                </View>
            </View>
            <TouchableOpacity onPress={onPressedPlaceOrder}
                style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Place Order</Text>
            </TouchableOpacity>
        </View>
    );
}

export default CoinsExchangeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        marginTop: 50,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTextStyle: {
        marginLeft: 97,
        fontSize: 20,
        fontWeight: '600',
    },
    informationContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinImageStyle: {
        width: 26,
        height: 26,
    },
    symbolTextStyle: {
        marginHorizontal: 5,
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    subTitleTextStyle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    imageStyle: {
        marginTop: 10,
        height: 280,
        width: 305,
        alignSelf: 'center',
    },
    inputsContainer: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainer: {
        flex: 1,
        padding: 12,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#cdcdcd',
        borderRadius: 5,
    },
    textInputStyle: {
        fontSize: 17,
        fontWeight: '500',
        color: '#636B77',
    },
    textStyle: {
        fontSize: 23,
        fontWeight: '400',
        color: '#A7A7A7',
    },
    inputTextStyle: {
        fontSize: 17,
        fontWeight: '400',
        color: '#A7A7A7',
    },
    buttonContainer: {
        padding: 12,
        marginTop: 30,
        marginBottom: 30,
        marginHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5E80FC',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
});