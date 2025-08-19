import { BookOpen, Home, Trophy, User, Plus } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window'); 

// Import screen components
import IndexScreen from './index';
import HafalanScreen from './hafalan';
import InputSetoranScreen from './input-setoran';
import LeaderboardScreen from './leaderboard';
import ProfileScreen from './profile';

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const { user, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/welcome');
    }
  }, [loading, user]);

  if (loading || !user || !profile) {
    return null;
  }

  const renderTabIcon = (IconComponent: any, focused: boolean, color: string, size: number, isCenter = false) => {
    if (isCenter) {
      return (
        <View style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          marginTop: -20,
          shadowColor: '#10B981',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 12,
        }}>
          <LinearGradient
            colors={focused ? ['#10B981', '#059669'] : ['#E5E7EB', '#D1D5DB']}
            style={{
              flex: 1,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'white',
            }}
          >
            <IconComponent size={28} color="white" />
          </LinearGradient>
        </View>
      );
    }
    
    return <IconComponent size={size} color={color} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 12,
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 85 + insets.bottom : 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={IndexScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => 
            renderTabIcon(Home, focused, color, size),
          title: 'Home',
        }}
      />
      
      <Tab.Screen
        name="Hafalan"
        component={HafalanScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => 
            renderTabIcon(BookOpen, focused, color, size),
          title: 'Hafalan',
        }}
      />
      
      <Tab.Screen
        name="Input"
        component={InputSetoranScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => 
            renderTabIcon(Plus, focused, color, size, true),
          title: '',
          tabBarLabel: '',
        }}
      />
      
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => 
            renderTabIcon(Trophy, focused, color, size),
          title: 'Peringkat',
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color, focused }) => 
            renderTabIcon(User, focused, color, size),
          title: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}