import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

const API_URL = 'http://localhost:5005/api/user/register';

export default function SignupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    govId: '',
    password: '',
  });

  const handleSignup = async () => {
    if (Object.values(form).some(value => !value)) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL, form);
      if (response.data.success) {
        Alert.alert('Account Created', 'Please login with your credentials', [
          { text: 'OK', onPress: () => router.replace('/(auth)/login') }
        ]);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Registration failed';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollInner}>
        <Text style={styles.title}>REGISTER</Text>
        
        <View style={styles.form}>
          <TextInput placeholder="Full Name" style={styles.input} onChangeText={t => setForm({...form, name: t})} />
          <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" onChangeText={t => setForm({...form, phone: t})} />
          <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={t => setForm({...form, email: t})} />
          <TextInput placeholder="PAN or Aadhaar Number" style={styles.input} autoCapitalize="characters" onChangeText={t => setForm({...form, govId: t})} />
          <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={t => setForm({...form, password: t})} />
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleSignup} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.btnText}>SIGN UP</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.footerText}>Already have an account? <Text style={styles.bold}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  scrollInner: { padding: 30, flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: '900', marginBottom: 30 },
  form: { marginBottom: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: '#EEE', paddingVertical: 12, fontSize: 16, marginBottom: 15 },
  btn: { backgroundColor: '#000', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 20, color: '#666' },
  bold: { fontWeight: 'bold', color: '#000' }
});