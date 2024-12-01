import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { normalize } from '../components/theme';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const signOutWithGoogle = async () => {
        auth().signOut();
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.profileTextStyle}>Profile</Text>
            <Image source={require('../../assets/images/crypto-rocket.png')}
                style={styles.profileImageStyle} />
            <Text style={styles.titleTextStyle}>App</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTextStyle}>Launch Screen</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>Home</Text>
                    <Entypo name='chevron-small-right' size={20} color='#5E80FC' />
                </View>
            </View>
            <View style={[styles.itemContainer, { marginTop: 20 }]}>
                <Text style={styles.itemTextStyle}>Appearance</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>Dark</Text>
                    <Entypo name='chevron-small-right' size={20} color='#5E80FC' />
                </View>
            </View>
            <Text style={[styles.titleTextStyle, { marginTop: 35 }]}>Account</Text>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTextStyle}>Payment Currency</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>USD</Text>
                    <Entypo name='chevron-small-right' size={20} color='#5E80FC' />
                </View>
            </View>
            <View style={[styles.itemContainer, { marginTop: 20 }]}>
                <Text style={styles.itemTextStyle}>Language</Text>
                <View style={styles.itemSubContainer}>
                    <Text style={styles.itemSubTextStyle}>English</Text>
                    <Entypo name='chevron-small-right' size={20} color='#5E80FC' />
                </View>
            </View>
            <Text style={[styles.titleTextStyle, { marginTop: 35 }]}>Assets</Text>
            <View style={styles.bottomContainer}>
                <Pressable onPress={() => navigation.navigate('Portfolio')} style={styles.subBottomContainer}>
                    <Image source={require('../../assets/images/dollar.png')} style={[styles.iconStyle,
                    { marginLeft: -4 }]} />
                    <Text style={styles.itemTextStyle}>Current Portfolio</Text>
                    <View style={[styles.itemSubContainer, { marginLeft: 'auto' }]}>
                        <Text style={styles.itemSubTextStyle}>0 USD</Text>
                        <Entypo name='chevron-small-right' size={20} color='#5E80FC' />
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Watchlist')}
                    style={[styles.subBottomContainer, { marginTop: 20 }]}>
                    <Image source={require('../../assets/images/star-icon.png')} style={styles.iconStyle} />
                    <Text style={styles.itemTextStyle}>Watchlist</Text>
                    <Entypo name='chevron-small-right' size={20} color='#5E80FC' style={styles.arrowIconStyle} />
                </Pressable>
            </View>
            <Pressable onPress={() => signOutWithGoogle()} style={styles.buttonContainer}>
                <Text style={styles.signOutTextStyle}>Sign Out</Text>
            </Pressable>
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: normalize(50),
        backgroundColor: '#141323',
    },
    profileTextStyle: {
        marginLeft: normalize(15),
        fontSize: 25,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#FFFFFF',
    },
    profileImageStyle: {
        marginBottom: normalize(8),
        width: normalize(240),
        height: normalize(180),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    titleTextStyle: {
        marginBottom: normalize(10),
        marginLeft: normalize(18),
        fontSize: 17,
        fontWeight: '600',
        fontFamily: 'Inter-Bold',
        color: '#5E80FC',
    },
    itemContainer: {
        marginLeft: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    itemTextStyle: {
        marginLeft: normalize(5),
        fontSize: 14.5,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#808B9D',
    },
    itemSubContainer: {
        marginRight: normalize(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemSubTextStyle: {
        marginRight: normalize(10),
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#808080',
    },
    bottomContainer: {
        marginLeft: normalize(15),
        marginTop: normalize(5),
        marginBottom: normalize(10),
    },
    subBottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconStyle: {
        width: normalize(30),
        height: normalize(30),
        resizeMode: 'contain',
    },
    arrowIconStyle: {
        marginLeft: 'auto',
        marginRight: normalize(15),
    },
    buttonContainer: {
        padding: normalize(14),
        marginHorizontal: normalize(20),
        marginTop: 'auto',
        marginBottom: normalize(20),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EA3943',
        borderRadius: 5,
    },
    signOutTextStyle: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
        color: '#FFFFFF',
    },
});