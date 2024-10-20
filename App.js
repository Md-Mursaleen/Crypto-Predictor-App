import React, { useEffect } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { RecoilRoot } from 'recoil';
import * as NavigationBar from 'expo-navigation-bar';
import WatchlistContext from './src/contexts/WatchlistContext';
import RootNavigation from './src/navigation/RootNavigation';

export default function App() {
  LogBox.ignoreAllLogs();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#141323');
  }, []);

  return (
    <RecoilRoot>
      <WatchlistContext>
        <View style={styles.container}>
          <RootNavigation />
          <StatusBar style='light' />
        </View>
      </WatchlistContext>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
