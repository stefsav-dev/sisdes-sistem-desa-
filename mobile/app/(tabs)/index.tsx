import { Link } from 'expo-router';
import { StyleSheet, View, Pressable } from 'react-native';

import { useAuth } from '@/components/providers/auth-provider';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">SIDDES Mobile</ThemedText>
      <ThemedText style={styles.subtitle}>
        Aplikasi Expo ini sudah memiliki form login dan register yang terhubung ke backend Laravel.
      </ThemedText>

      {isAuthenticated && user ? (
        <View style={styles.card}>
          <ThemedText type="subtitle">Session Aktif</ThemedText>
          <ThemedText>Nama: {user.name}</ThemedText>
          <ThemedText>Email: {user.email}</ThemedText>
          <ThemedText>Role: {user.role}</ThemedText>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutText}>Logout</ThemedText>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <ThemedText type="subtitle">Belum Login</ThemedText>
          <Link href="/login" style={styles.linkButton}>
            Login
          </Link>
          <Link href="/register" style={styles.secondaryLink}>
            Register akun baru
          </Link>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 18,
  },
  subtitle: {
    lineHeight: 22,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    gap: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  linkButton: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
    overflow: 'hidden',
  },
  secondaryLink: {
    textAlign: 'center',
    color: '#2563eb',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: '#fee2e2',
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: '#b91c1c',
    fontWeight: '700',
  },
});
