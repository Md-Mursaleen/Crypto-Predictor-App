import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { normalize } from '../components/theme';

const SplashScreen = () => {
    useEffect(() => {
        NavigationBar.setBackgroundColorAsync('#ffffff');
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.jpg')}
                style={styles.imageStyle} />
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052fe',
    },
    imageStyle: {
        width: normalize(120),
        height: normalize(120),
        resizeMode: 'contain',
    },
});