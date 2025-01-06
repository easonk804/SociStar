import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthService from '../../../services/AuthService';
import { THEME } from '../../../config';
import { styles } from './styles';

const EditProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AuthService.getCurrentUser();
      if (userData) {
        setUser(userData);
        setUsername(userData.username || '');
        setBio(userData.bio || '');
      }
    } catch (error) {
      console.error('加载用户数据失败:', error);
      Alert.alert('错误', '加载用户数据失败');
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await AuthService.updateProfile({
        username,
        bio,
      });
      Alert.alert('成功', '个人资料已更新');
    } catch (error) {
      console.error('更新个人资料失败:', error);
      Alert.alert('错误', '更新个人资料失败');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={THEME.COLORS.PRIMARY} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>用户名</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="请输入用户名"
          placeholderTextColor={THEME.COLORS.GRAY}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>个人简介</Text>
        <TextInput
          style={[styles.input, styles.bioInput]}
          value={bio}
          onChangeText={setBio}
          placeholder="请输入个人简介"
          placeholderTextColor={THEME.COLORS.GRAY}
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          loading && styles.saveButtonDisabled,
        ]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={THEME.COLORS.LIGHT} />
        ) : (
          <Text style={styles.saveButtonText}>保存修改</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfileScreen;
