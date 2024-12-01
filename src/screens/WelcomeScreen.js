import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { normalize } from '../components/theme';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    const handleGetStarted = async () => {
        await AsyncStorage.setItem('hasShownWelcome', 'true');
        navigation.dispatch(
            StackActions.replace('Login'),
        );
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/welcome-image.png')}
                style={styles.imageStyle} />
            <View style={styles.headerContainer}>
                <Text style={styles.titleTextStyle}>Welcome to</Text>
                <Image source={require('../../assets/images/banner-image.png')}
                    style={styles.bannerImageStyle} />
            </View>
            <Text style={styles.subTitleTextStyle}>Invest your virtual crypto and</Text>
            <Text style={styles.subTitleTextStyle}>compete with others</Text>
            <TouchableOpacity onPress={handleGetStarted} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Start Investing</Text>
                <Feather name='arrow-right' size={24} color='#FFFFFF' style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
    },
    imageStyle: {
        marginTop: normalize(65),
        width: '85%',
        height: '35%',
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleTextStyle: {
        marginTop: normalize(15),
        fontSize: 32,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#000000',
        textAlign: 'center',
    },
    bannerImageStyle: {
        marginBottom: normalize(5),
        height: normalize(60),
        width: '60%',
    },
    subTitleTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#A7A7A7',
        fontFamily: 'PlusJakartaSans-Medium',
        textAlign: 'center',
    },
    buttonContainer: {
        padding: normalize(14),
        marginTop: 'auto',
        marginBottom: normalize(30),
        marginHorizontal: normalize(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052FE',
        borderRadius: 5,
    },
    buttonTextStyle: {
        marginRight: -18,
        marginLeft: 'auto',
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});