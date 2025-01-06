import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AuthService from '../../../services/AuthService';
import { styles } from './styles';

interface UserStats {
  friendsCount: number;
  chatRoomsCount: number;
  messagesCount: number;
}

const ProfileScreen = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    friendsCount: 0,
    chatRoomsCount: 0,
    messagesCount: 0,
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (userData) {
        setUser(userData);
        // 模拟数据
        setStats({
          friendsCount: 128,
          chatRoomsCount: 15,
          messagesCount: 1024,
        });
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
      Alert.alert('错误', '加载用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      '退出登录',
      '确定要退出登录吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            try {
              await AuthService.logout();
              router.replace('/auth/login');
            } catch (error) {
              console.error('退出登录失败:', error);
              Alert.alert('错误', '退出登录失败');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 头部个人信息 */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: user?.avatar || 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.username}>{user?.username || '未设置昵称'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* 统计信息 */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.friendsCount}</Text>
          <Text style={styles.statLabel}>好友</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.chatRoomsCount}</Text>
          <Text style={styles.statLabel}>聊天室</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.messagesCount}</Text>
          <Text style={styles.statLabel}>消息</Text>
        </View>
      </View>

      {/* 功能菜单 */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile/edit')}
        >
          <Ionicons
            name="person-outline"
            size={24}
            color="#007AFF"
          />
          <Text style={styles.menuText}>编辑资料</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#AAAAAA"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile/privacy')}
        >
          <Ionicons
            name="shield-outline"
            size={24}
            color="#007AFF"
          />
          <Text style={styles.menuText}>隐私设置</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#AAAAAA"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile/notifications')}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#007AFF"
          />
          <Text style={styles.menuText}>通知设置</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#AAAAAA"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push('/profile/about')}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#007AFF"
          />
          <Text style={styles.menuText}>关于我们</Text>
          <Ionicons
            name="chevron-forward"
            size={24}
            color="#AAAAAA"
          />
        </TouchableOpacity>
      </View>

      {/* 退出登录按钮 */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>

      {/* 版本信息 */}
      <Text style={styles.version}>版本 1.0.0</Text>
    </ScrollView>
  );
};

export default ProfileScreen;
