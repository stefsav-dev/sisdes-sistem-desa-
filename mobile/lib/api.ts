import Constants from 'expo-constants';
import { Platform } from 'react-native';

function getExpoHost() {
  const hostUri =
    Constants.expoConfig?.hostUri ??
    Constants.expoGoConfig?.debuggerHost ??
    null;

  return hostUri?.split(':')[0] ?? null;
}

const expoHost = getExpoHost();

export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (expoHost
    ? `http://${expoHost}:8000/api`
    : Platform.OS === 'android'
      ? 'http://10.0.2.2:8000/api'
      : 'http://127.0.0.1:8000/api');

type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
};

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as ApiErrorPayload | null;

  if (!response.ok) {
    const firstValidationError = payload?.errors
      ? Object.values(payload.errors).flat()[0]
      : null;

    throw new Error(payload?.message ?? payload?.error ?? firstValidationError ?? 'Request failed');
  }

  return payload as T;
}
