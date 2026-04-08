import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function HomePage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.brandTitle}>ADVOCACY</Text>
        <Text style={styles.tagline}>Constitutional & Legal Services</Text>
        
        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            Step 3 Complete: Base App Loaded.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholderCard: {
    marginTop: 40,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#333333',
    fontStyle: 'italic',
  },
});