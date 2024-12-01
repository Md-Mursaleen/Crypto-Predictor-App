import React, { useState, useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import * as Font from 'expo-font';
import WatchlistContext from './src/contexts/WatchlistContext';
import RootNavigation from './src/navigation/RootNavigation';
import SplashScreen from './src/screens/SplashScreen';

LogBox.ignoreAllLogs();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#FFFFFF');
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
          'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
          'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
          'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
          'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
          'Raleway-Bold': require('./assets/fonts/Raleway-Bold.ttf'),
          'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
          'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
          'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
          'Mukta-Medium': require('./assets/fonts/Mukta-Medium.ttf'),
          'Mukta-SemiBold': require('./assets/fonts/Mukta-SemiBold.ttf'),
          'Mukta-Regular': require('./assets/fonts/Mukta-Regular.ttf'),
          'Mukta-ExtraBold': require('./assets/fonts/Mukta-ExtraBold.ttf'),
          'Mukta-Bold': require('./assets/fonts/Mukta-Bold.ttf'),
          'PlusJakartaSans-Medium': require('./assets/fonts/PlusJakartaSans-Medium.ttf'),
          'PlusJakartaSans-SemiBold': require('./assets/fonts/PlusJakartaSans-SemiBold.ttf'),
          'PlusJakartaSans-Regular': require('./assets/fonts/PlusJakartaSans-Regular.ttf'),
          'PlusJakartaSans-Bold': require('./assets/fonts/PlusJakartaSans-Bold.ttf'),
          'PlusJakartaSans-ExtraBold': require('./assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
          'Lora-SemiBold': require('./assets/fonts/Lora-SemiBold.ttf'),
          'Lora-Medium': require('./assets/fonts/Lora-Medium.ttf'),
          'Lora-Bold': require('./assets/fonts/Lora-Bold.ttf'),
          'Lora-Regular': require('./assets/fonts/Lora-Regular.ttf'),
          'Lora-SemiBoldItalic': require('./assets/fonts/Lora-SemiBoldItalic.ttf'),
          'Lora-MediumItalic': require('./assets/fonts/Lora-MediumItalic.ttf'),
          'Lora-BoldItalic': require('./assets/fonts/Lora-BoldItalic.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.log(error);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  return (
    <RecoilRoot>
      <WatchlistContext>
        <View style={styles.container}>
          {!fontsLoaded ? (
            <NavigationContainer>
              <SplashScreen />
            </NavigationContainer>
          ) : (
            <RootNavigation />
          )}
          <StatusBar style='light' />
        </View>
      </WatchlistContext>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
