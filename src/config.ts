import { Platform } from 'react-native';

// 使用本机IP地址，确保设备可以访问到API服务器
// 请将下面的IP地址替换为您的电脑在局域网中的IP地址
const DEV_API_HOST = '192.168.1.3'; // 替换为您的本机IP地址
const DEV_API_PORT = '3000';          // 替换为您的API服务器端口

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android') {
      // Android模拟器使用10.0.2.2
      return `http://10.0.2.2:${DEV_API_PORT}`;
    }
    // 真机或iOS模拟器使用本机IP
    return `http://${DEV_API_HOST}:${DEV_API_PORT}`;
  }
  // 生产环境
  return 'https://your-production-api.com';
};

export const API_URL = getApiUrl();

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_INFO: 'user_info',
};
