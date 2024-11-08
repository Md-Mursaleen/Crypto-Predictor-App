import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const DrawerTabNavigation = () => {
    return (
        <Drawer.Navigator screenOptions={{ headerShown: false }}
            initialRouteName='Profile'>
            <Drawer.Screen name='Profile' component={ProfileScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerTabNavigation;