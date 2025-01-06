import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../../../config';
import { styles } from './styles';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '100';

const AboutScreen = () => {
  const handleOpenLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('错误', '无法打开链接');
      }
    } catch (error) {
      console.error('打开链接失败:', error);
      Alert.alert('错误', '打开链接失败');
    }
  };

  const handleCheckUpdate = () => {
    Alert.alert('检查更新', '当前已是最新版本');
  };

  return (
    <ScrollView style={styles.container}>
      {/* 应用信息 */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>SociStar</Text>
        </View>
        <Text style={styles.appName}>SociStar</Text>
        <Text style={styles.version}>Version {APP_VERSION} ({BUILD_NUMBER})</Text>
        <Text style={styles.slogan}>连接每一刻，分享每一天</Text>
      </View>

      {/* 功能列表 */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleCheckUpdate}
        >
          <View style={styles.menuContent}>
            <Ionicons
              name="cloud-download-outline"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
            <Text style={styles.menuText}>检查更新</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME.COLORS.GRAY}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://example.com/privacy')}
        >
          <View style={styles.menuContent}>
            <Ionicons
              name="shield-outline"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
            <Text style={styles.menuText}>隐私政策</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME.COLORS.GRAY}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://example.com/terms')}
        >
          <View style={styles.menuContent}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
            <Text style={styles.menuText}>服务条款</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME.COLORS.GRAY}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => handleOpenLink('https://example.com/feedback')}
        >
          <View style={styles.menuContent}>
            <Ionicons
              name="chatbox-outline"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
            <Text style={styles.menuText}>意见反馈</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={24}
            color={THEME.COLORS.GRAY}
          />
        </TouchableOpacity>
      </View>

      {/* 社交媒体链接 */}
      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>关注我们</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://weibo.com/example')}
          >
            <Ionicons
              name="logo-weibo"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://twitter.com/example')}
          >
            <Ionicons
              name="logo-twitter"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleOpenLink('https://github.com/example')}
          >
            <Ionicons
              name="logo-github"
              size={24}
              color={THEME.COLORS.PRIMARY}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={styles.footerText}> 2025 SociStar. All rights reserved.</Text>
        <TouchableOpacity
          onPress={() => handleOpenLink('mailto:support@example.com')}
        >
          <Text style={styles.footerLink}>联系我们</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;
