import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../../../config';
import { styles } from './styles';

interface PrivacySettings {
  showOnlineStatus: boolean;
  showLastSeen: boolean;
  showProfilePhoto: boolean;
  allowFriendRequests: boolean;
  showLocation: boolean;
  allowGroupInvites: boolean;
}

const PrivacySettingsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<PrivacySettings>({
    showOnlineStatus: true,
    showLastSeen: true,
    showProfilePhoto: true,
    allowFriendRequests: true,
    showLocation: true,
    allowGroupInvites: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('privacySettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('加载隐私设置失败:', error);
      Alert.alert('错误', '加载隐私设置失败');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof PrivacySettings, value: boolean) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await AsyncStorage.setItem('privacySettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('更新隐私设置失败:', error);
      Alert.alert('错误', '更新隐私设置失败');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 在线状态设置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>在线状态</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示在线状态</Text>
            <Text style={styles.settingDescription}>
              让其他用户看到你是否在线
            </Text>
          </View>
          <Switch
            value={settings.showOnlineStatus}
            onValueChange={(value) => updateSetting('showOnlineStatus', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示最后在线时间</Text>
            <Text style={styles.settingDescription}>
              让其他用户看到你最后活跃的时间
            </Text>
          </View>
          <Switch
            value={settings.showLastSeen}
            onValueChange={(value) => updateSetting('showLastSeen', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 个人资料设置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>个人资料</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示头像</Text>
            <Text style={styles.settingDescription}>
              让其他用户看到你的头像
            </Text>
          </View>
          <Switch
            value={settings.showProfilePhoto}
            onValueChange={(value) => updateSetting('showProfilePhoto', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 社交设置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>社交</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>允许好友请求</Text>
            <Text style={styles.settingDescription}>
              是否接收新的好友请求
            </Text>
          </View>
          <Switch
            value={settings.allowFriendRequests}
            onValueChange={(value) => updateSetting('allowFriendRequests', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>允许群聊邀请</Text>
            <Text style={styles.settingDescription}>
              是否接收群聊邀请
            </Text>
          </View>
          <Switch
            value={settings.allowGroupInvites}
            onValueChange={(value) => updateSetting('allowGroupInvites', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 位置设置 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>位置</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示位置信息</Text>
            <Text style={styles.settingDescription}>
              让其他用户看到你的位置
            </Text>
          </View>
          <Switch
            value={settings.showLocation}
            onValueChange={(value) => updateSetting('showLocation', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 黑名单管理 */}
      <TouchableOpacity style={styles.blockListButton}>
        <Text style={styles.blockListText}>管理黑名单</Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={THEME.COLORS.PRIMARY}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PrivacySettingsScreen;
