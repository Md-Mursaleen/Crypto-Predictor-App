import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import CryptoDetailsScreen from "../screens/CryptoDetailsScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import AddAssetScreen from "../screens/AddAssetScreen";
import CryptoExchangeScreen from "../screens/CryptoExchangeScreen";
import BottomTabNavigation from "./BottomTabNavigation";

const Stack = createStackNavigator();

const RootNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="BottomTab" component={BottomTabNavigation} />
                <Stack.Screen name="CryptoDetails" component={CryptoDetailsScreen} />
                <Stack.Screen name="Asset" component={AddAssetScreen} />
                <Stack.Screen name="CryptoExchange" component={CryptoExchangeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigation;