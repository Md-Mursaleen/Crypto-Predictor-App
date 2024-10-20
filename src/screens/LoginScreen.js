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
    const [user, setUser] = useState();

    GoogleSignin.configure({
        webClientId: '1017811191585-sncskt58kev837t6f4a18kl03gcm1dao.apps.googleusercontent.com'
    });

    function onAuthStateChanged(user) {
        setUser(user);
        AsyncStorage.setItem('SignedUserData', JSON.stringify({ user, loggedIn: true }));
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    useEffect(() => {
        if (user) {
            navigation.navigate('BottomTab');
        }
    }, [user]);

    const signInWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const signedInUser = auth().signInWithCredential(googleCredential);
        signedInUser.then((user) => {
            console.log(user);
        }).catch((error) => {
            console.log(error);
        });
        navigation.navigate('Welcome');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/logo.jpg')}
                style={styles.logoImageStyle} />
            <Text style={styles.titleTextStyle}>Easily track your</Text>
            <Text style={styles.subTitleTextStyle}>crypto</Text>
            <Text style={styles.textStyle}>Trusted by over 1 million users</Text>
            <LottieView source={require('../../assets/animations/login-animation.json')}
                autoPlay={true}
                loop={true}
                style={styles.lottieAnimationStyle} />
            <TouchableOpacity onPress={() => signInWithGoogle()}
                style={styles.buttonContainer}>
                <Text style={styles.buttonTextStyle}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    logoImageStyle: {
        marginTop: normalize(70),
        marginLeft: normalize(32),
        width: normalize(60),
        height: normalize(60),
        resizeMode: 'contain'
    },
    titleTextStyle: {
        marginTop: normalize(10),
        marginLeft: normalize(30),
        fontSize: 36,
        fontWeight: '700',
        color: '#000000'
    },
    subTitleTextStyle: {
        marginTop: normalize(-8),
        marginLeft: normalize(30),
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0052fe'
    },
    textStyle: {
        marginTop: normalize(10),
        marginLeft: normalize(30),
        fontSize: 16,
        fontWeight: '600',
        color: 'grey'
    },
    lottieAnimationStyle: {
        flex: 1,
        marginTop: '20%',
        marginHorizontal: normalize(8),
        alignSelf: 'center',
        resizeMode: 'contain',
        overflow: 'hidden'
    },
    buttonContainer: {
        padding: normalize(13),
        marginHorizontal: normalize(12),
        marginTop: 'auto',
        marginBottom: normalize(30),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0052fe',
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    }
});