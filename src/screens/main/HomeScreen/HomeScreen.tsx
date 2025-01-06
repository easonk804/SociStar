import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreenContent from './HomeScreenContent';
import { FriendsScreen } from '../../social';
import { MessageScreen } from '../../chat';
import { ProfileScreen } from '../../social';

type TabParamList = {
  主页: undefined;
  好友: undefined;
  消息: undefined;
  个人: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          
          switch (route.name) {
            case '主页':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '好友':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case '消息':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case '个人':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#f8f8f8',
          height: 45,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        headerTopInsetEnabled: false,
        headerTitleAlign: 'center',
      })}
    >
      <Tab.Screen 
        name="主页" 
        component={HomeScreenContent}
        options={{
          title: 'S2T',
        }}
      />
      <Tab.Screen 
        name="好友" 
        component={FriendsScreen}
        options={{
          title: '好友',
        }}
      />
      <Tab.Screen 
        name="消息" 
        component={MessageScreen}
        options={{
          title: '消息',
        }}
      />
      <Tab.Screen 
        name="个人" 
        component={ProfileScreen}
        options={{
          title: '个人',
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;