import { config as dotenvConfig } from 'dotenv';
import type { ExpoConfig } from 'expo/config';

// Load .env.local first, then .env as fallback
dotenvConfig({ path: '.env.local' });
dotenvConfig({ path: '.env' });

const config: ExpoConfig = {
  name: 'bavardo',
  slug: 'bavardo',
  version: '1.0.0',
  scheme: 'bavardo',
  platforms: ['ios', 'android'],
  web: {
    bundler: 'metro',
    output: 'static' as const,
    favicon: './assets/bavardo_1024.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    'expo-audio',
    'expo-speech-recognition',
    'expo-notifications',
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },
  orientation: 'portrait',
  icon: './assets/bavardo_1024.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/bavardo_1024.png',
    resizeMode: 'contain' as const,
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.aksel.michelo.bavardo',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    splash: {
      image: './assets/bavardo_1024.png',
      resizeMode: 'contain' as const,
      backgroundColor: '#ffffff',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/bavardo_1024.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.aksel.michelo.bavardo',
    splash: {
      image: './assets/bavardo_1024.png',
      resizeMode: 'contain' as const,
      backgroundColor: '#ffffff',
    },
  },
  extra: {
    router: {},
    geminiApiKey: process.env.GEMINI_API_KEY,
    eas: {
      projectId: '7160fff0-eb61-42c6-8f77-50e62f6ce3d9',
    },
  },
};

export default config;
