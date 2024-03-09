import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [signedUser, setSignedUser] = useState();

    const getSignedUserData = async () => {
        const signedUserData = await AsyncStorage.getItem("SignedUserData");
        setSignedUser(JSON.parse(signedUserData));
    };

    useEffect(() => {
        getSignedUserData();
    }, []);

    const signOutWithGoogle = async () => {
        auth().signOut();
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.profileTextStyle}>Profile</Text>
            <Image source={require("../../assets/images/profile-image.png")}
                style={styles.profileImageStyle} />
            <Text style={styles.titleTextStyle}>APP</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTextStyle}>Launch Screen</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>Home</Text>
                    <Entypo name="chevron-small-right" size={20} color="#5e80fc" />
                </View>
            </View>
            <View style={[styles.itemContainer, { marginTop: 25 }]}>
                <Text style={styles.itemTextStyle}>Appearance</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>Dark</Text>
                    <Entypo name="chevron-small-right" size={20} color="#5e80fc" />
                </View>
            </View>
            <Text style={[styles.titleTextStyle, { marginTop: 40 }]}>ACCOUNT</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTextStyle}>Payment Currency</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>USD</Text>
                    <Entypo name="chevron-small-right" size={20} color="#5e80fc" />
                </View>
            </View>
            <View style={[styles.itemContainer, { marginTop: 25 }]}>
                <Text style={styles.itemTextStyle}>Language</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>English</Text>
                    <Entypo name="chevron-small-right" size={20} color="#5e80fc" />
                </View>
            </View>
            <Text style={[styles.titleTextStyle, { marginTop: 40 }]}>ASSETS</Text>
            <View style={styles.bottomContainer}>
                <Pressable onPress={() => navigation.navigate("Portfolio")}
                    style={styles.subBottomContainer}>
                    {/* <Image source={require("../../assets/images/wallet-image.png")}
                        style={[styles.iconStyle, { marginLeft: 5 }]} /> */}
                    <Text style={styles.bottomContainerTextStyle}>Current Portfolio</Text>
                    <View style={styles.itemSubContainer}>
                        <Text style={styles.itemSubTextStyle}>0 USD</Text>
                        <Entypo name="chevron-small-right" size={20} color="#5e80fc" />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Watchlist")}
                    style={[styles.subBottomContainer, { marginTop: 25 }]}>
                    {/* <Image source={require("../../assets/images/star-icon.png")}
                        style={styles.iconStyle} /> */}
                    <Text style={styles.bottomContainerTextStyle}>Watchlist</Text>
                    <Entypo name="chevron-small-right" size={20} color="#5e80fc"
                        style={styles.arrowIconStyle} />
                </Pressable>
            </View>
            <Pressable onPress={() => signOutWithGoogle()}
                style={styles.buttonContainer}>
                <Text style={styles.signOutTextStyle}>Sign Out</Text>
            </Pressable>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "#141323"
    },
    profileTextStyle: {
        marginLeft: 15,
        fontSize: 29,
        fontWeight: "bold",
        color: "#ffffff"
    },
    profileImageStyle: {
        marginBottom: 8,
        width: 240,
        height: 180,
        alignSelf: "center",
        resizeMode: "contain"
    },
    titleTextStyle: {
        marginVertical: 12,
        marginLeft: 20,
        fontSize: 14.8,
        fontWeight: "600",
        color: "#5e80fc"
    },
    itemContainer: {
        marginLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    itemTextStyle: {
        marginLeft: 5,
        fontSize: 14.3,
        fontWeight: "500",
        color: "#d6d6d8"
    },
    itemSubContainer: {
        marginRight: 17,
        flexDirection: "row",
        alignItems: "center"
    },
    itemSubTextStyle: {
        marginRight: 10,
        fontSize: 14,
        fontWeight: "500",
        color: "grey"
    },
    bottomContainer: {
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 10,
    },
    subBottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    iconStyle: {
        width: 30,
        height: 30,
        resizeMode: "contain"
    },
    bottomContainerTextStyle: {
        // marginLeft: 15,
        marginLeft: 5,
        fontSize: 15.5,
        fontWeight: "500",
        color: "#d6d6d8"
    },
    arrowIconStyle: {
        marginLeft: "auto",
        marginRight: 18
    },
    buttonContainer: {
        padding: 12,
        marginHorizontal: 18,
        marginTop: "auto",
        marginBottom: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ea3943",
        borderRadius: 5
    },
    signOutTextStyle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#ffffff"
    }
});