import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import * as MediaLibrary from 'expo-media-library';

export default function HomePage() {
  
  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    // 1. Location Permission
    const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
    if (locStatus !== 'granted') {
      Alert.alert('Permission Denied', 'Advocacy needs location to find local legal aid.');
    }

    // 2. Contacts Permission
    const { status: conStatus } = await Contacts.requestPermissionsAsync();
    if (conStatus !== 'granted') {
       Alert.alert('Permission Denied', 'Access to contacts is needed for legal referrals.');
    }

    // 3. File/Media Permission
    const { status: medStatus } = await MediaLibrary.requestPermissionsAsync();
    if (medStatus !== 'granted') {
       Alert.alert('Permission Denied', 'Media access is required to upload legal documents.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.brandTitle}>ADVOCACY</Text>
        <Text style={styles.tagline}>Constitutional & Legal Services</Text>
        
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>Permissions Requested Successfully.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' },
  brandTitle: { fontSize: 32, fontWeight: '800', letterSpacing: 2 },
  tagline: { fontSize: 14, color: '#666', marginTop: 8, textTransform: 'uppercase' },
  statusBox: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#000',
    borderRadius: 8,
    width: '100%',
  },
  statusText: { color: '#FFF', textAlign: 'center', fontWeight: 'bold' }
});