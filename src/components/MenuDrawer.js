import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, FlatList } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import { normalize } from './theme';

const data = [
    { id: 1, value: 'Rewards', other: false, otherText: '', },
    { id: 2, value: 'Vitality Resources', other: true, otherText: 'Soon!', },
    { id: 3, value: 'Help & Support', other: false, otherText: '', },
    { id: 4, value: 'Settings', other: false, otherText: '', },
    { id: 5, value: 'Suggest a Feature', other: true, otherText: 'Win Points!!', },
];

const iconData = {
    1: require('../../assets/images/rank.png'),
    2: require('../../assets/images/gps.png'),
    3: require('../../assets/images/help-polygon.png'),
    4: require('../../assets/images/setting.png'),
    5: require('../../assets/images/loading.png'),
};

const MenuDrawer = ({ closeDrawer }) => {
    const navigation = useNavigation();

    const handleItemPressable = () => {
        if (item.id === 3) {
            navigation.navigate('HelpSupport');
        }
        else if (item.id === 4) {
            navigation.navigate('ProfileSettings');
        }
    };

    const handleSignout = () => {
        GoogleSignin.signOut();
        navigation.navigate('Login');
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.headerContainer}>
                <Pressable onPress={closeDrawer}>
                    <Image source={require('../../assets/images/close-icon.png')} tintColor={'#FFFFFF'} />
                </Pressable>
                <Pressable onPress={handleSignout} style={styles.headerSubContainer}>
                    <Image source={require('../../assets/images/logout.png')} tintColor={'#D0585C'} />
                    <Text style={styles.headerTextStyle}>Logout</Text>
                </Pressable>
            </View>
            <View style={styles.userDetailsContainer}>
                <Image source={require('../../assets/images/profile-image.png')}
                    style={styles.profileImageStyle} />
                <View style={styles.userDetailsTextContainer}>
                    <Text style={styles.userNameTextStyle}>Anshul</Text>
                    <Text style={styles.userDetailsTextStyle}>Longevity Enthusiast</Text>
                </View>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitleTextStyle}>Checkout Pro!</Text>
                <Text style={styles.cardDesciptionTextStyle}>Get access to advanced Mira, premium content, credits, and more...</Text>
                <Pressable style={styles.cardButtonContainer}
                    accessibilityLabel='Upgrade button' accessible={true}>
                    <Text style={styles.cardButtonTextStyle}>Upgrade!</Text>
                </Pressable>
            </View>
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitleTextStyle}>Invite your friends & earn rewards!</Text>
                <Image source={require('../../assets/images/drawer-image.png')} style={{ width: '100%' }} />
                <Text style={[styles.cardDesciptionTextStyle, { marginTop: 8 }]}>Win exciting rewards and credits when your friends sign up.</Text>
                <Pressable style={styles.cardButtonContainer}
                    accessibilityLabel='Refer now button' accessible={true}>
                    <Text style={styles.cardButtonTextStyle}>Refer now!</Text>
                </Pressable>
            </View>
            <FlatList data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleItemPressable(item)} style={styles.itemContainer}
                        accessibilityLabel={`${item.value} button`} accessible={true}>
                        <View style={styles.itemSubContainer}>
                            <Image source={iconData[item.id]} tintColor={'#EEEEEE'} />
                            <Text style={styles.itemTextStyle}>{item.value}</Text>
                        </View>
                        {item.other && (
                            <View style={styles.otherContainer}>
                                <Text style={styles.otherTextStyle}>{item.otherText}</Text>
                            </View>
                        )}
                    </Pressable>
                )} style={{ paddingVertical: 12 }} />
        </ScrollView>
    );
}

export default MenuDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: normalize(30),
        backgroundColor: '#141323',
    },
    headerContainer: {
        paddingHorizontal: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerSubContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    headerTextStyle: {
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#D0585C',
        lineHeight: 18,
    },
    userDetailsContainer: {
        paddingTop: 35,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    userDetailsTextContainer: {
        marginLeft: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    userNameTextStyle: {
        fontSize: 28,
        fontWeight: '400',
        fontFamily: 'Lora-MediumItalic',
        color: '#EEEEEE',
        lineHeight: 36,
    },
    userDetailsTextStyle: {
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Regular',
        color: '#EEEEEE',
        lineHeight: 18,
    },
    cardContainer: {
        padding: 13,
        marginVertical: 5,
        width: '100%',
        height: 'auto',
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
    },
    cardTitleTextStyle: {
        marginBottom: 8,
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#000000',
        lineHeight: 18,
    },
    cardDesciptionTextStyle: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#000000',
        lineHeight: 18,
    },
    cardButtonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 24,
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 40,
    },
    cardButtonTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#000000',
        lineHeight: 18,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#EEEEEE',
    },
    itemSubContainer: {
        paddingVertical: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    itemTextStyle: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: 'PlusJakartaSans-SemiBold',
        color: '#EEEEEE',
        lineHeight: 18,
    },
    otherContainer: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 6,
    },
    otherTextStyle: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'PlusJakartaSans-Medium',
        color: '#EEEEEE',
        lineHeight: 15,
        textAlign: 'center',
    },
});