import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            <Text style={styles.profileText}>Profile</Text>
            <Image source={require("../../assets/images/profile-image.jpg")} style={styles.profileImageStyle} />
            <View style={{ marginTop: 10 }}>
                <Text style={styles.usernameText}>{signedUser?.user?.displayName}</Text>
            </View>
            <View style={styles.middleContainer}>
                <Text style={styles.assetsText}>Your Assets</Text>
                <View style={{ marginTop: 20 }}>
                    <View style={styles.subMiddleContainer}>
                        <View>
                            <MaterialIcons name="attach-money" size={32} color="black" />
                        </View>
                        <View style={{ marginLeft: 15 }}>
                            <Text style={styles.middleContainerText} onPress={() => navigation.navigate("Portfolio")}>Current Assets</Text>
                            <Text style={styles.middleContainerSubText} onPress={() => navigation.navigate("Asset")}>Add Asset</Text>
                        </View>
                    </View>
                    <View style={styles.borderStyle} />
                    <View style={styles.middleContainerBottomContainer}>
                        <View>
                            <FontAwesome5 name="star" size={22} color="black" />
                        </View>
                        <View style={{ marginLeft: 20 }}>
                            <Text style={styles.middleContainerText} onPress={() => navigation.navigate("Watchlist")}>Watchlist Assets</Text>
                            <Text style={styles.middleContainerSubText} onPress={() => navigation.navigate("Markets")} >Add Watchlist</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Pressable onPress={() => signOutWithGoogle()}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: "white"
    },
    profileText: {
        marginLeft: 15,
        fontSize: 29,
        fontWeight: "bold",
        color: "black"
    },
    profileImageStyle: {
        height: 180,
        width: 180,
        alignSelf: "center",
        resizeMode: "contain"
    },
    usernameText: {
        marginTop: -10,
        fontSize: 18,
        fontWeight: "500",
        color: "#636b77",
        textAlign: "center"
    },
    middleContainer: {
        marginLeft: 15,
        marginTop: 20
    },
    assetsText: {
        marginTop: 20,
        fontSize: 18.5,
        fontWeight: "500",
        color: "black"
    },
    subMiddleContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    middleContainerText: {
        fontSize: 14.8,
        fontWeight: "500",
        color: "black"
    },
    middleContainerSubText: {
        marginTop: 18,
        fontSize: 13,
        fontWeight: "500",
        color: "grey"
    },
    borderStyle: {
        marginTop: 20,
        marginRight: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "grey"
    },
    middleContainerBottomContainer: {
        marginLeft: 3,
        marginTop: 18,
        flexDirection: "row",
        alignItems: "center"
    },
    bottomContainer: {
        marginTop: 20,
        marginLeft: 15
    },
    signOutText: {
        marginTop: 25,
        fontSize: 18.5,
        fontWeight: "600",
        color: "#636b77"
    }
});