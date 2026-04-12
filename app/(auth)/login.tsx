import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ensure this matches your MacBook's current Local IP
const API_URL = 'http://localhost:5005/api/user/login'; 

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Error', 'Please enter your credentials');
      return;
    }

    setLoading(true);
    try {
      // DEBUG: Verify exactly what is being sent in your terminal
      console.log("Attempting Login with:", { 
        identifier: identifier.trim(), 
        password: password.trim() 
      });

      const response = await axios.post(
        API_URL, 
        {
          identifier: identifier.trim(), 
          password: password.trim()
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000 
        }
      );

      if (response.data.success) {
        // Save the session data
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
        
        // Navigate to the dashboard
        router.replace('/(main)/home');
      }
    } catch (error: any) {
      // Capture the exact backend message
      const errorMsg = error.response?.data?.message || 'Login failed. Check server connection.';
      console.log("Server rejected login:", error.response?.data);
      Alert.alert('Login Failed', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.title}>ADVOCACY</Text>
          <Text style={styles.subtitle}>Email, Client ID, or Gov ID</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Identifier"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.loginButton, loading && { backgroundColor: '#444' }]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>LOG IN</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/signup')} disabled={loading}>
          <Text style={styles.footerText}>
            Need an account? <Text style={styles.signUpLink}>Register Now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  inner: { flex: 1, padding: 35, justifyContent: 'center' },
  header: { marginBottom: 40 },
  title: { fontSize: 38, fontWeight: '900', letterSpacing: 2, color: '#000' },
  subtitle: { fontSize: 14, color: '#666', marginTop: 5 },
  inputContainer: { marginBottom: 30 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#EEE',
    marginBottom: 25,
    paddingBottom: 8,
  },
  icon: { marginRight: 12 },
  input: { flex: 1, height: 40, fontSize: 16 },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    height: 60,
    justifyContent: 'center'
  },
  loginButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, letterSpacing: 1 },
  footerText: { textAlign: 'center', color: '#666' },
  signUpLink: { color: '#000', fontWeight: 'bold' },
});