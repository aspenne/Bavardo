import { Ionicons } from '@expo/vector-icons';
import { Link, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type MainLayoutProps = {
  children: React.ReactNode;
};

type TabItemProps = {
  href: '/home' | '/messages' | '/calendar' | '/games';
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  activeIconName: keyof typeof Ionicons.glyphMap;
  tabKey: string;
  activeTab: string;
};

function TabItem({ href, label, iconName, activeIconName, tabKey, activeTab }: TabItemProps) {
  const isActive = activeTab === tabKey;
  return (
    <Link href={href} asChild>
      <TouchableOpacity className="flex-1 items-center py-md">
        {isActive && <View className="mb-xs h-[3px] w-10 rounded-full bg-accent" />}
        <Ionicons
          name={isActive ? activeIconName : iconName}
          size={28}
          color={isActive ? '#F1844F' : '#4A897A'}
        />
        <Text
          className={`mt-xs text-sm font-semibold ${isActive ? 'text-accent' : 'text-secondary'}`}>
          {label}
        </Text>
      </TouchableOpacity>
    </Link>
  );
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

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
    <SafeAreaView className="flex-1 bg-primary">
      <StatusBar style="light" />

      {/* Header */}
      <View className="flex-row items-center justify-between bg-primary px-lg py-md">
        <View className="flex-row items-center gap-sm">
          <View className="h-10 w-10 items-center justify-center rounded-md bg-white">
            <Text className="text-xl font-bold text-primary">🐢</Text>
          </View>
          <Text className="text-2xl font-bold text-white">BAVARDO</Text>
        </View>
        <View className="flex-row items-center gap-md">
          <View className="items-end">
            <Text className="text-base text-white">{getCurrentDate()}</Text>
            <Text className="text-xl font-semibold text-white">{getCurrentTime()}</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 bg-background">{children}</View>

      {/* Bottom Navigation */}
      <View className="border-t border-gray-200 bg-white">
        <View className="flex-row">
          <TabItem
            href="/home"
            label="Accueil"
            iconName="home-outline"
            activeIconName="home"
            tabKey="home"
            activeTab={activeTab}
          />
          <TabItem
            href="/messages"
            label="Messagerie"
            iconName="chatbubbles-outline"
            activeIconName="chatbubbles"
            tabKey="messages"
            activeTab={activeTab}
          />
          <TabItem
            href="/calendar"
            label="Agenda"
            iconName="calendar-outline"
            activeIconName="calendar"
            tabKey="agenda"
            activeTab={activeTab}
          />
          <TabItem
            href="/games"
            label="Jeux"
            iconName="game-controller-outline"
            activeIconName="game-controller"
            tabKey="games"
            activeTab={activeTab}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
