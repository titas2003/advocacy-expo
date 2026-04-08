import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isGifLoaded, setIsGifLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // We give the GIF 4 seconds to play
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn("Loader Error:", e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.loaderContainer}>
        <Image 
          // ENSURE THIS PATH IS EXACTLY CORRECT
          source={require('../assets/images/loader.gif')} 
          style={styles.gifStyle}
          resizeMode="contain"
          onLoad={() => setIsGifLoaded(true)}
        />
        {/* If the GIF takes too long to decode, show a spinner so it's not blank */}
        {!isGifLoaded && (
          <ActivityIndicator size="small" color="#000000" style={{ marginTop: 20 }} />
        )}
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifStyle: {
    width: width * 0.7,
    height: width * 0.7,
  },
});