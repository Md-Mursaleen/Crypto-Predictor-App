import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import ProfileScreen from "../screens/ProfileScreen";
import PortfolioScreen from "../screens/PortfolioScreen";
import WatchlistScreen from "../screens/WatchlistScreen";
import CryptoHomeScreen from "../screens/CryptoHomeScreen";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
    return (
        <BottomTab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: "#5e80fc",
            tabBarInactiveTintColor: "#808b9d"
        }}>
            <BottomTab.Screen name="Markets" component={CryptoHomeScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <FontAwesome name="line-chart" size={21} color={color} /> : <Fontisto name="line-chart" size={20.5} color={color} />
            }} />
            <BottomTab.Screen name="Portfolio" component={PortfolioScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <Feather name="pie-chart" size={24} color={color} /> : <Fontisto name="pie-chart-1" size={24} color={color} />
            }} />
            <BottomTab.Screen name="Watchlist" component={WatchlistScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <FontAwesome5 name="star" size={22} color={color} /> : <FontAwesome name="star" size={25.5} color={color} />
            }} />
            <BottomTab.Screen name="Profile" component={ProfileScreen} options={{
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarIcon: ({ color, focused }) => !focused ? <FontAwesome name="user-o" size={23} color={color} /> : <FontAwesome name="user" size={27.5} color={color} />
            }} />
        </BottomTab.Navigator>
    );
}

export default BottomTabNavigation;

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 55,
        backgroundColor: "white"
    },
    tabBarLabelStyle: {
        paddingBottom: 0,
        fontSize: 11.5,
        fontWeight: "600"
    }
});