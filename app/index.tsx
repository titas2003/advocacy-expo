import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function setupApp() {
      try {
        // Trigger all permissions
        await requestPermissions();
      } catch (e) {
        console.warn("Permission Error:", e);
      } finally {
        // Small delay to ensure smooth transition after permissions
        setIsReady(true);
      }
    }

    setupApp();
  }, []);

  const requestPermissions = async () => {
    // We run these in sequence so the system pop-ups don't overlap/clash
    await Location.requestForegroundPermissionsAsync();
    await Contacts.requestPermissionsAsync();
    await MediaLibrary.requestPermissionsAsync();
  };

  useEffect(() => {
    if (isReady) {
      // Once permissions are handled, redirect to the Login page
      // Use replace so the user can't "go back" to this gatekeeper
      router.replace('/(auth)/login');
    }
  }, [isReady]);

  // While processing permissions, show a simple loader to bridge from the GIF
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});