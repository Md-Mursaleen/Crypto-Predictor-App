import "expo-dev-client";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    GoogleSignin.configure({
        webClientId: "1017811191585-sncskt58kev837t6f4a18kl03gcm1dao.apps.googleusercontent.com"
    });
    function onAuthStateChanged(user) {
        setUser(user);
        AsyncStorage.setItem("SignedUserData", JSON.stringify({ user, loggedIn: true }));
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    useEffect(() => {
        if (user) {
            navigation.navigate("BottomTab");
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
        if (user) {
            navigation.navigate("Welcome");
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image source={require("../../assets/images/icon-image.png")}
                    style={styles.logoImageStyle} />
            </View>
            <Text style={styles.titleTextStyle}>Easily track your</Text>
            <Text style={styles.subTitleTextStyle}>crypto</Text>
            <Text style={styles.textStyle}>Trusted by over 1 million users</Text>
            <LottieView source={require("../../assets/animations/login-animation.json")}
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
        backgroundColor: "#ffffff"
    },
    headerContainer: {
        marginTop: 70,
        marginLeft: 35,
        flexDirection: "row",
        alignItems: "center"
    },
    logoImageStyle: {
        marginLeft: -12,
        height: 90,
        width: 90,
        resizeMode: "contain"
    },
    titleTextStyle: {
        marginTop: -5,
        marginLeft: 30,
        fontSize: 38,
        fontWeight: "bold",
        color: "#000000"
    },
    subTitleTextStyle: {
        marginTop: -8,
        marginLeft: 30,
        fontSize: 32,
        fontWeight: "bold",
        color: "#0088f9"
    },
    textStyle: {
        marginTop: 15,
        marginLeft: 30,
        fontSize: 16,
        fontWeight: "bold",
        color: "grey"
    },
    imageStyle: {
        marginTop: -25,
        width: "100%",
        alignSelf: "center",
        resizeMode: "contain"
    },
    lottieAnimationStyle: {
        flex: 1,
        marginTop: "23%",
        alignSelf: "center",
        resizeMode: "contain",
        overflow: "hidden"
    },
    buttonContainer: {
        padding: 12.5,
        marginHorizontal: 10,
        marginTop: "auto",
        marginBottom: 26,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0088f9",
        borderRadius: 5
    },
    buttonTextStyle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff"
    }
});