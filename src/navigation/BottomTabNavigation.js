import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { normalize } from '../components/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Zocial from 'react-native-vector-icons/Zocial';
import PortfolioScreen from '../screens/PortfolioScreen';
import WatchlistScreen from '../screens/WatchlistScreen';
import CryptoHomeScreen from '../screens/CryptoHomeScreen';
import CryptoNewsScreen from '../screens/CryptoNewsScreen';
import StockHomeScreen from '../screens/StockHomeScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: '#5E80FC',
            tabBarInactiveTintColor: '#808B9D',
        }}>
            <BottomTab.Screen name='Cryptos' component={CryptoHomeScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <FontAwesome name='bitcoin' size={26} color={color} /> :
                    <Zocial name='bitcoin' size={30} color={color} />
            }} />
            <BottomTab.Screen name='Portfolio' component={PortfolioScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <Feather name='pie-chart' size={24} color={color} /> :
                    <Fontisto name='pie-chart-1' size={26} color={color} />
            }} />
            <BottomTab.Screen name='Watchlist' component={WatchlistScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <FontAwesome5 name='star' size={22} color={color} /> :
                    <FontAwesome name='star' size={26} color={color} />
            }} />
            <BottomTab.Screen name='Crypto News' component={CryptoNewsScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <Ionicons name='reader-outline' size={27} color={color} /> :
                    <Ionicons name='reader' size={29} color={color} />
            }} />
            {/* <BottomTab.Screen name='Profile' component={ProfileScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ focused }) => !focused ? signedUser?.loggedIn === true &&
                    <Image source={{ uri: signedUser?.user?.photoURL }} style={styles.profileImageStyle} /> :
                    signedUser?.loggedIn === true && <Image source={{ uri: signedUser?.user?.photoURL }} style={styles.profileImageStyle} />
            }} /> */}
            <BottomTab.Screen name='Stocks' component={StockHomeScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <AntDesign name='apple-o' size={27} color={color} /> :
                    <AntDesign name='apple1' size={29} color={color} />
            }} />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: normalize(55),
        backgroundColor: '#141323',
        borderTopWidth: 0,
    },
    tabBarLabelStyle: {
        fontSize: 11.5,
        fontWeight: '600',
        fontFamily: 'Inter-SemiBold',
    },
    profileImageStyle: {
        width: normalize(30),
        height: normalize(30),
        borderWidth: 2.5,
        borderColor: '#5E80FC',
        borderRadius: 50,
    },
});