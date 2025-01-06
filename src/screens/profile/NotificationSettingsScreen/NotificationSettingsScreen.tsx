import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { THEME } from '../../../config';
import { styles } from './styles';

interface NotificationSettings {
  // 消息通知
  messageNotifications: boolean;
  messagePreview: boolean;
  messageSound: boolean;
  messageVibrate: boolean;

  // 群聊通知
  groupNotifications: boolean;
  groupPreview: boolean;
  groupSound: boolean;
  groupVibrate: boolean;

  // 好友通知
  friendRequestNotifications: boolean;
  friendActivityNotifications: boolean;

  // 系统通知
  systemNotifications: boolean;
  updateNotifications: boolean;
}

const NotificationSettingsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<NotificationSettings>({
    messageNotifications: true,
    messagePreview: true,
    messageSound: true,
    messageVibrate: true,
    groupNotifications: true,
    groupPreview: true,
    groupSound: true,
    groupVibrate: true,
    friendRequestNotifications: true,
    friendActivityNotifications: true,
    systemNotifications: true,
    updateNotifications: true,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('notificationSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('加载通知设置失败:', error);
      Alert.alert('错误', '加载通知设置失败');
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);
      await AsyncStorage.setItem('notificationSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('更新通知设置失败:', error);
      Alert.alert('错误', '更新通知设置失败');
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
      {/* 私聊消息通知 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>私聊消息</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>接收通知</Text>
            <Text style={styles.settingDescription}>
              接收新的私聊消息通知
            </Text>
          </View>
          <Switch
            value={settings.messageNotifications}
            onValueChange={(value) => updateSetting('messageNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示消息预览</Text>
            <Text style={styles.settingDescription}>
              在通知中显示消息内容
            </Text>
          </View>
          <Switch
            value={settings.messagePreview}
            onValueChange={(value) => updateSetting('messagePreview', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>声音提醒</Text>
            <Text style={styles.settingDescription}>
              收到消息时播放提示音
            </Text>
          </View>
          <Switch
            value={settings.messageSound}
            onValueChange={(value) => updateSetting('messageSound', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>震动提醒</Text>
            <Text style={styles.settingDescription}>
              收到消息时震动提醒
            </Text>
          </View>
          <Switch
            value={settings.messageVibrate}
            onValueChange={(value) => updateSetting('messageVibrate', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 群聊消息通知 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>群聊消息</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>接收通知</Text>
            <Text style={styles.settingDescription}>
              接收新的群聊消息通知
            </Text>
          </View>
          <Switch
            value={settings.groupNotifications}
            onValueChange={(value) => updateSetting('groupNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>显示消息预览</Text>
            <Text style={styles.settingDescription}>
              在通知中显示群聊消息内容
            </Text>
          </View>
          <Switch
            value={settings.groupPreview}
            onValueChange={(value) => updateSetting('groupPreview', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>声音提醒</Text>
            <Text style={styles.settingDescription}>
              收到群聊消息时播放提示音
            </Text>
          </View>
          <Switch
            value={settings.groupSound}
            onValueChange={(value) => updateSetting('groupSound', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>震动提醒</Text>
            <Text style={styles.settingDescription}>
              收到群聊消息时震动提醒
            </Text>
          </View>
          <Switch
            value={settings.groupVibrate}
            onValueChange={(value) => updateSetting('groupVibrate', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 社交通知 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>社交通知</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>好友请求</Text>
            <Text style={styles.settingDescription}>
              收到新的好友请求时通知
            </Text>
          </View>
          <Switch
            value={settings.friendRequestNotifications}
            onValueChange={(value) => updateSetting('friendRequestNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>好友动态</Text>
            <Text style={styles.settingDescription}>
              好友上线或状态更新时通知
            </Text>
          </View>
          <Switch
            value={settings.friendActivityNotifications}
            onValueChange={(value) => updateSetting('friendActivityNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 系统通知 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>系统通知</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>系统消息</Text>
            <Text style={styles.settingDescription}>
              接收系统公告和重要通知
            </Text>
          </View>
          <Switch
            value={settings.systemNotifications}
            onValueChange={(value) => updateSetting('systemNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingTitle}>更新提醒</Text>
            <Text style={styles.settingDescription}>
              有新版本时通知
            </Text>
          </View>
          <Switch
            value={settings.updateNotifications}
            onValueChange={(value) => updateSetting('updateNotifications', value)}
            trackColor={{ false: THEME.COLORS.GRAY, true: THEME.COLORS.PRIMARY }}
            thumbColor={THEME.COLORS.LIGHT}
          />
        </View>
      </View>

      {/* 免打扰时段设置入口 */}
      <TouchableOpacity style={styles.doNotDisturbButton}>
        <Text style={styles.doNotDisturbText}>免打扰时段设置</Text>
        <Ionicons
          name="chevron-forward"
          size={24}
          color={THEME.COLORS.PRIMARY}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NotificationSettingsScreen;
