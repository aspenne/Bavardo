import { Stack } from 'expo-router';

import MainLayout from '@/components/layout/MainLayout';

export default function AppLayout() {
  return (
    <MainLayout>
      <Stack screenOptions={{ headerShown: false }} />
    </MainLayout>
  );
}
