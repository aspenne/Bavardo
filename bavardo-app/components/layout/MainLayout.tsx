import { Link, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getCurrentDate = () => {
    const days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ];
    const now = currentTime;
    return `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]}`;
  };

  const getCurrentTime = () => {
    return `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
  };

  const getActiveTab = () => {
    if (pathname === '/home') return 'home';
    if (pathname === '/calendar') return 'agenda';
    if (pathname === '/messages') return 'messages';
    if (pathname === '/games') return 'games';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-primary px-lg py-md">
        <View className="flex-row items-center gap-sm">
          <View className="h-8 w-8 items-center justify-center rounded-sm bg-white">
            <Text className="text-lg font-bold text-primary">🐢</Text>
          </View>
          <Text className="text-xl font-bold text-white">BAVARDO</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-white">{getCurrentDate()}</Text>
          <Text className="text-lg font-semibold text-white">{getCurrentTime()}</Text>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1">{children}</View>

      {/* Bottom Navigation */}
      <View className="border-background-dark border-t-2 bg-background">
        <View className="flex-row justify-around gap-sm px-md py-sm">
          {/* Accueil */}
          <Link href="/home" asChild>
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-xl py-md ${
                activeTab === 'home' ? 'bg-accent' : 'bg-secondary'
              }`}>
              <Text className="mb-xs text-3xl text-white">🏠</Text>
              <Text className="text-base font-semibold text-white">Accueil</Text>
            </TouchableOpacity>
          </Link>

          {/* Messagerie */}
          <Link href="/messages" asChild>
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-xl py-md ${
                activeTab === 'messages' ? 'bg-accent' : 'bg-secondary'
              }`}>
              <Text className="mb-xs text-3xl text-white">💬</Text>
              <Text className="text-base font-semibold text-white">Messagerie</Text>
            </TouchableOpacity>
          </Link>

          {/* Agenda */}
          <Link href="/calendar" asChild>
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-xl py-md ${
                activeTab === 'agenda' ? 'bg-accent' : 'bg-secondary'
              }`}>
              <Text className="mb-xs text-3xl text-white">📅</Text>
              <Text className="text-base font-semibold text-white">Agenda</Text>
            </TouchableOpacity>
          </Link>

          {/* Jeux */}
          <Link href="/games" asChild>
            <TouchableOpacity
              className={`flex-1 items-center justify-center rounded-xl py-md ${
                activeTab === 'games' ? 'bg-accent' : 'bg-secondary'
              }`}>
              <Text className="mb-xs text-3xl text-white">🎲</Text>
              <Text className="text-base font-semibold text-white">Jeux</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}
