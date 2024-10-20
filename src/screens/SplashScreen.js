import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { normalize } from '../components/theme';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
    const navigation = useNavigation();
    const [signedUser, setSignedUser] = useState();

    useEffect(() => {
        const hasShownWelcome = async () => {
            const hasShownWelcome = await AsyncStorage.getItem('hasShownWelcome');
            if (hasShownWelcome === null) {
                navigation.dispatch(
                    StackActions.replace('Welcome'),
                )
            }
            else {
                const signedUserData = await AsyncStorage.getItem('SignedUserData');
                setSignedUser(JSON.parse(signedUserData));
                if (signedUser) {
                    navigation.dispatch(
                        StackActions.replace('BottomTab'),
                    )
                }
                else {
                    navigation.dispatch(
                        StackActions.replace('Login'),
                    )
                }
            }
        };
        hasShownWelcome();
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