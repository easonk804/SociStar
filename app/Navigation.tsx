import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../src/constants/colors';

// 导入主页面组件
import MainScreen from '../src/screens/main/HomeScreen/MainScreen';

// 导入个人相关组件
import { 
  EditProfileScreen,
  PrivacySettingsScreen,
  NotificationSettingsScreen,
  AboutScreen,
} from '../src/screens/profile';

// 导入聊天相关组件
import { 
  ChatScreen, 
  ChatRoomScreen, 
  ChatRoomDetailScreen 
} from '../src/screens/chat';

// 创建导航器
const Stack = createNativeStackNavigator();

// 主导航
const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      initialRouteName="Main"
    >
      {/* 主页面标签导航 */}
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ headerShown: false }}
      />

      {/* 个人相关页面 */}
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: '编辑资料' }}
      />
      <Stack.Screen 
        name="PrivacySettings" 
        component={PrivacySettingsScreen} 
        options={{ title: '隐私设置' }}
      />
      <Stack.Screen 
        name="NotificationSettings" 
        component={NotificationSettingsScreen} 
        options={{ title: '通知设置' }}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ title: '关于我们' }}
      />

      {/* 聊天相关页面 */}
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={({ route }) => ({ 
          title: route.params?.name || '聊天',
        })}
      />
      <Stack.Screen 
        name="ChatRoom" 
        component={ChatRoomScreen} 
        options={{ title: '聊天室' }}
      />
      <Stack.Screen 
        name="ChatRoomDetail" 
        component={ChatRoomDetailScreen} 
        options={{ title: '聊天室详情' }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;