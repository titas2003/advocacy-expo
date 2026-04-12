import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState({ name: 'User', clientId: '-------' });

  useEffect(() => {
    const fetchUser = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        setUser(JSON.parse(data));
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutBtn}>← Logout</Text>
          </TouchableOpacity>
          <View style={styles.branding}>
            <Ionicons name="shield-half" size={24} color="#2E7D32" />
            <Text style={styles.brandText}>Advocacy</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="person-circle" size={35} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Welcome Banner */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Hello, {user.name}!</Text>
          <Text style={styles.clientBadge}>Client ID: {user.clientId}</Text>
        </View>

        {/* Primary Action: Advisory */}
        <TouchableOpacity style={styles.mainCard}>
           <View style={styles.mainCardContent}>
              <Ionicons name="balance-scale" size={50} color="#4A707A" />
              <View style={styles.mainCardText}>
                <Text style={styles.cardTitle}>LEGAL ADVISORY</Text>
                <Text style={styles.cardDesc}>Connect with verified lawyers now.</Text>
                <View style={styles.cardBtn}>
                  <Text style={styles.cardBtnText}>View Profiles</Text>
                </View>
              </View>
           </View>
        </TouchableOpacity>

        {/* Action Grid */}
        <View style={styles.grid}>
          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#F1F8E9' }]}>
            <Ionicons name="document-text" size={32} color="#2E7D32" />
            <Text style={styles.gridLabel}>DOCUMENTS</Text>
            <Text style={styles.gridSub}>Manage Files</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="calendar" size={32} color="#1565C0" />
            <Text style={styles.gridLabel}>BOOKINGS</Text>
            <Text style={styles.gridSub}>Schedule Now</Text>
          </TouchableOpacity>
        </View>

        {/* Next Appointment Simulation */}
        <View style={styles.appointmentSection}>
          <Text style={styles.sectionHeader}>UPCOMING CONSULTATION</Text>
          <View style={styles.apptCard}>
            <Ionicons name="time-outline" size={24} color="#000" />
            <View style={{ marginLeft: 15 }}>
              <Text style={styles.apptDate}>14 OCT, 02:00 PM</Text>
              <Text style={styles.apptDetail}>Constitutional Review with Adv. Jensen</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  logoutBtn: { color: '#666', fontWeight: '500' },
  branding: { flexDirection: 'row', alignItems: 'center' },
  brandText: { fontSize: 20, fontWeight: 'bold', color: '#2E7D32', marginLeft: 5 },
  welcomeSection: { marginBottom: 30 },
  greeting: { fontSize: 28, fontWeight: '800', color: '#000' },
  clientBadge: { color: '#666', fontSize: 14, marginTop: 4, letterSpacing: 1 },
  mainCard: { backgroundColor: '#F8F9FA', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: '#EEE' },
  mainCardContent: { flexDirection: 'row', alignItems: 'center' },
  mainCardText: { marginLeft: 20, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '900', color: '#002855' },
  cardDesc: { fontSize: 12, color: '#666', marginVertical: 4 },
  cardBtn: { backgroundColor: '#002855', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start', marginTop: 5 },
  cardBtnText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  grid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  gridCard: { width: (width - 55) / 2, padding: 20, borderRadius: 20, alignItems: 'center' },
  gridLabel: { fontWeight: '900', fontSize: 12, marginTop: 10 },
  gridSub: { fontSize: 10, color: '#666' },
  appointmentSection: { marginTop: 30 },
  sectionHeader: { fontSize: 12, fontWeight: '700', color: '#999', marginBottom: 10, letterSpacing: 1 },
  apptCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 20, borderRadius: 15 },
  apptDate: { fontSize: 16, fontWeight: 'bold' },
  apptDetail: { fontSize: 12, color: '#666' }
});