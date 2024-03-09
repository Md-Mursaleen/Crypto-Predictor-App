import React, { useEffect } from "react";
import { StyleSheet, View, LogBox } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RecoilRoot } from "recoil";
import WatchlistContext from "./src/contexts/WatchlistContext";
import * as NavigationBar from "expo-navigation-bar";
import RootNavigation from "./src/navigation/RootNavigation";

LogBox.ignoreAllLogs();

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <RecoilRoot>
      <WatchlistContext>
        <View style={styles.container}>
          <RootNavigation />
          <StatusBar style="light" />
        </View>
      </WatchlistContext>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});
