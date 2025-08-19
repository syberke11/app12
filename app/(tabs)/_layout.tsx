import { BookOpen, Building2, CloudUpload, Home, HousePlus, ListChecks, Monitor, Plus, Shield, Trophy, User, Zap } from 'lucide-react-native';

import { useAuth } from '@/contexts/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window'); 

// Import screen components (pastikan path sesuai struktur project kamu)
import admin from './admin';
import IndexScreen from './index';
import JoinOrganizeScreen from './join-organize';
import LeaderboardScreen from './leaderboard';
import monitoring from './monitoring';
import organize from './organize';
import penilaian from './penilaian';
import ProfileScreen from './profile';
import QuizScreen from './quiz';
import QuranScreen from './quran';
import SetoranScreen from './setoran';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const { user, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const role = profile?.role;

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/welcome');
    }
  }, [loading, user]);

  if (loading || !user || !profile) {
    return null;
  }

  const getTabsForRole = () => {
    const commonTabs = [
      { name: 'Beranda', component: IndexScreen, icon: Home },
      { name: 'Jam Sholat', component: QuranScreen, icon: BookOpen },
      { name: 'Leaderboard', component: LeaderboardScreen, icon: Trophy },
    ];

    switch (role) {
      case 'siswa':
        return [
          ...commonTabs,
          { name: 'Setoran', component: SetoranScreen, icon: Plus },
          { name: 'Quiz', component: QuizScreen, icon: ListChecks },
          { name: 'Gabung Kelas', component: JoinOrganizeScreen, icon: HousePlus },
          { name: 'Profil', component: ProfileScreen, icon: User },
        ];
          case 'ortu':
        return [
          ...commonTabs,
       { name: 'monitoring', component: monitoring, icon: Monitor  },
          { name: 'Gabung Kelas', component: JoinOrganizeScreen, icon: HousePlus },
          { name: 'Profil', component: ProfileScreen, icon: User },
        ];
          case 'guru':
        return [
          ...commonTabs,
                 { name: 'Penilaian', component: penilaian, icon: CloudUpload },
           { name: 'monitoring', component: monitoring, icon: Monitor  },
           { name: 'Organize', component: organize, icon: Building2 },
          { name: 'Profil', component: ProfileScreen, icon: User },
        ];
          case 'admin':
        return [
          ...commonTabs,
          { name: 'Admin', component: admin, icon: Shield },
        ];
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole();

  const renderTabIcon = (IconComponent: any, focused: boolean, color: string, size: number, isSpecial = false) => {
    if (isSpecial && focused) {
      return (
        <View style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          marginTop: -20,
          shadowColor: '#3B82F6',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}>
          <LinearGradient
            colors={['#3B82F6', '#6366F1']}
            style={{
              flex: 1,
              borderRadius: 28,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconComponent size={28} color="white" />
          </LinearGradient>
        </View>
      );
    }
    
    if (isSpecial) {
      return (
        <View style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: '#F1F5F9',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: -10,
        }}>
          <IconComponent size={24} color="#64748B" />
        </View>
      );
    }

    return <IconComponent size={size} color={color} />;
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 12 : 16,
          paddingTop: 16,
          height: Platform.OS === 'ios' ? 90 + insets.bottom : 90,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 10,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: width < 380 ? 10 : 12,
          marginTop: 6,
        },
        tabBarIconStyle: {
          marginTop: 6,
        },
      }}
    >
      {tabs.map((tab, index) => {
        const isSpecialTab = tab.name === 'Setoran' || tab.name === 'Penilaian';
        
        return (
        <Tab.Screen
          key={tab.name} 
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ size, color, focused }) => 
              renderTabIcon(tab.icon, focused, color, size, isSpecialTab),
            tabBarLabel: isSpecialTab && Platform.OS === 'ios' ? '' : tab.name,
            tabBarLabelStyle: {
              ...styles.tabLabel,
              opacity: isSpecialTab ? 0 : 1,
            },
          }}
        />
        );
      })}
    </Tab.Navigator>
  );
}

const styles = {
  tabLabel: {
    fontWeight: '600' as const,
    fontSize: width < 380 ? 10 : 12,
    marginTop: 6,
  },
};
