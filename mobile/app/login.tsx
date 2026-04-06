import { Link, router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/components/providers/auth-provider';
import { API_URL, parseApiResponse } from '@/lib/api';

type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'warga' | 'admin' | 'superadmin';
    ktp_id?: number | null;
  };
};

export default function LoginScreen() {
  const { setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email dan password wajib diisi.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await parseApiResponse<LoginResponse>(response);

      setSession({
        accessToken: result.access_token,
        refreshToken: result.refresh_token,
        user: result.user,
      });

      router.replace('/(tabs)');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.badge}>SIDDES Gabahan</Text>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Masuk untuk mengakses akun desa Anda.</Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="user@example.com"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                secureTextEntry
                placeholder="Masukkan password"
                placeholderTextColor="#94a3b8"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              disabled={loading}
              onPress={handleLogin}>
              {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Login</Text>}
            </Pressable>

            <Text style={styles.footerText}>
              Belum punya akun?{' '}
              <Link href="/register" style={styles.footerLink}>
                Register
              </Link>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e2e8f0',
  },
  keyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#e2e8f0',
  },
  card: {
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 24,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  badge: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderRadius: 999,
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  errorText: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fee2e2',
    padding: 12,
    color: '#b91c1c',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0f172a',
  },
  button: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: '#0f172a',
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#475569',
  },
  footerLink: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
});
