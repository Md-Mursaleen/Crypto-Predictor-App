import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
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
            <Text style={[styles.subTitleTextStyle, { marginTop: -5 }]}>
                Invest your virtual crypto and</Text>
            <Text style={styles.subTitleTextStyle}>compete with others</Text>
            <TouchableOpacity onPress={handleGetStarted}
                style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Start Investing</Text>
                <Feather name='arrow-right' size={24} color='#ffffff' style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    imageStyle: {
        marginTop: 65,
        width: '85%',
        height: '35%',
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    headerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleTextStyle: {
        marginLeft: 3,
        marginTop: 15,
        marginBottom: 10,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0d243d'
    },
    bannerImageStyle: {
        marginTop: -28,
        height: 100,
        width: '62%',
        resizeMode: 'contain'
    },
    subTitleTextStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#a7a7a7',
        textAlign: 'center'
    },
    buttonContainer: {
        padding: 11,
        marginTop: 180,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0088f9',
        borderRadius: 5
    },
    buttonTextStyle: {
        marginRight: -20,
        marginLeft: 'auto',
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    }
});