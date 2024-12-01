import 'expo-dev-client';
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { normalize } from '../components/theme';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);

    GoogleSignin.configure({
        webClientId: '1017811191585-sncskt58kev837t6f4a18kl03gcm1dao.apps.googleusercontent.com'
    });

    function onAuthStateChanged(user) {
        AsyncStorage.setItem('SignedUserData', JSON.stringify({ user: user, loggedIn: true }));
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.idToken;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const signedInUser = auth().signInWithCredential(googleCredential);
        signedInUser.then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
        navigation.navigate('BottomTab');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/login.png')} style={styles.imageStyle} />
            <Text style={styles.titleTextStyle}>Easily track your</Text>
            <Text style={styles.subTitleTextStyle}>crypto</Text>
            <Text style={styles.textStyle}>Trusted by over 1 million users</Text>
            <LottieView source={require('../../assets/animations/login-animation.json')}
                autoPlay={true}
                loop={true}
                style={styles.lottieAnimationStyle} />
            <TouchableOpacity onPress={signInWithGoogle} style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FA',
    },
    imageStyle: {
        marginTop: normalize(-30),
        marginLeft: normalize(-5),
        width: '70%',
        height: '30%',
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginTop: normalize(-90),
        marginLeft: normalize(30),
        fontSize: 35,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#000000',
    },
    subTitleTextStyle: {
        marginTop: normalize(-8),
        marginLeft: normalize(30),
        fontSize: 30,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#0052FE',
    },
    textStyle: {
        marginTop: normalize(10),
        marginLeft: normalize(30),
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#808080',
    },
    lottieAnimationStyle: {
        flex: 1,
        marginTop: '15%',
        marginHorizontal: normalize(5),
        alignSelf: 'center',
        resizeMode: 'contain',
        overflow: 'hidden',
    },
    buttonContainer: {
        padding: normalize(14),
        marginTop: 'auto',
        marginBottom: normalize(20),
        marginHorizontal: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052FE',
        borderRadius: 5,
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#FFFFFF',
        lineHeight: 24,
    },
});