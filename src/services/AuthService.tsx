import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config';

interface UserInfo {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
  friendsCount: number;
  chatRoomsCount: number;
}

interface AuthResponse {
  token: string;
  user: UserInfo;
}

class AuthService {
  private mockUser: UserInfo = {
    id: '1',
    username: '测试用户',
    email: 'test@example.com',
    bio: '这是一个测试账号',
    avatar: 'https://via.placeholder.com/150',
    friendsCount: 42,
    chatRoomsCount: 8,
  };

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  async register(): Promise<AuthResponse> {
    const response: AuthResponse = {
      token: this.generateToken(),
      user: this.mockUser,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.user));
    return response;
  }

  async login(): Promise<AuthResponse> {
    const response: AuthResponse = {
      token: this.generateToken(),
      user: this.mockUser,
    };
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(response.user));
    return response;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }

  async getCurrentUser(): Promise<UserInfo | null> {
    return this.mockUser;
  }

  async isAuthenticated(): Promise<boolean> {
    return true;
  }
}

export default new AuthService();
