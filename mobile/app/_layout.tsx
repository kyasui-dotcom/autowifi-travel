import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/components/useColorScheme';
import '@/lib/i18n';
import { loadSavedLanguage } from '@/lib/i18n';

// Register background tasks at module level (required by expo-task-manager)
import '@/services/geofence-service';
import '@/services/background-ssid-check';
import { useGeofenceMonitor } from '@/hooks/useGeofenceMonitor';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const LANGUAGE_STORAGE_KEY = 'autowifi_language';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  // Check if this is the first launch (no language saved yet)
  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_STORAGE_KEY).then((val) => {
      setIsFirstLaunch(val === null);
      if (val !== null) {
        loadSavedLanguage();
      }
    });
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isFirstLaunch !== null) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isFirstLaunch]);

  if (!loaded || isFirstLaunch === null) {
    return null;
  }

  return <RootLayoutNav isFirstLaunch={isFirstLaunch} />;
}

function RootLayoutNav({ isFirstLaunch }: { isFirstLaunch: boolean }) {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  // Initialize geofence monitoring (reads persisted setting, starts if enabled)
  useGeofenceMonitor();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={isFirstLaunch ? 'language-select' : '(tabs)'}>
        <Stack.Screen
          name="language-select"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="portal/[spotId]"
          options={{
            title: t('nav.wifiConnect'),
            presentation: "modal",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="esim-webview"
          options={{
            title: t('nav.esimPurchase'),
            presentation: "modal",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="esim"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
