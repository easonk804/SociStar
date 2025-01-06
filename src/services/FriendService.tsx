import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

interface Friend {
  id: string;
  username: string;
  status: string;
  avatar?: string;
  lastSeen?: Date;
}

interface FriendRequest {
  id: string;
  from: {
    id: string;
    username: string;
    avatar?: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

// 模拟数据
const MOCK_FRIENDS: Friend[] = [
  {
    id: '1',
    username: '张三',
    status: 'online',
    lastSeen: new Date(),
  },
  {
    id: '2',
    username: '李四',
    status: 'offline',
    lastSeen: new Date(Date.now() - 3600000), // 1小时前
  },
  {
    id: '3',
    username: '王五',
    status: 'online',
    lastSeen: new Date(),
  },
];

const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: '1',
    from: {
      id: '4',
      username: '赵六',
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000), // 1天前
  },
  {
    id: '2',
    from: {
      id: '5',
      username: '钱七',
    },
    status: 'pending',
    createdAt: new Date(Date.now() - 43200000), // 12小时前
  },
];

const MOCK_BLOCKED_USERS: Friend[] = [
  {
    id: '6',
    username: '孙八',
    status: 'blocked',
    lastSeen: new Date(Date.now() - 604800000), // 7天前
  },
];

class FriendService {
  private async getHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getFriendsList(): Promise<Friend[]> {
    try {
      // 模拟网络延迟
      await this.delay(500);
      return MOCK_FRIENDS;
    } catch (error) {
      console.error('获取好友列表失败:', error);
      throw error;
    }
  }

  async getFriendRequests(): Promise<FriendRequest[]> {
    try {
      await this.delay(500);
      return MOCK_FRIEND_REQUESTS;
    } catch (error) {
      console.error('获取好友请求失败:', error);
      throw error;
    }
  }

  async sendFriendRequest(userId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('发送好友请求失败:', error);
      throw error;
    }
  }

  async acceptFriendRequest(requestId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('接受好友请求失败:', error);
      throw error;
    }
  }

  async rejectFriendRequest(requestId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('拒绝好友请求失败:', error);
      throw error;
    }
  }

  async removeFriend(friendId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('删除好友失败:', error);
      throw error;
    }
  }

  async blockUser(userId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('拉黑用户失败:', error);
      throw error;
    }
  }

  async unblockUser(userId: string): Promise<void> {
    try {
      await this.delay(500);
      // 模拟成功
    } catch (error) {
      console.error('取消拉黑失败:', error);
      throw error;
    }
  }

  async getBlockedUsers(): Promise<Friend[]> {
    try {
      await this.delay(500);
      return MOCK_BLOCKED_USERS;
    } catch (error) {
      console.error('获取黑名单失败:', error);
      throw error;
    }
  }

  async searchFriends(query: string): Promise<Friend[]> {
    try {
      await this.delay(500);
      // 模拟搜索结果
      return MOCK_FRIENDS.filter(friend => 
        friend.username.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('搜索好友失败:', error);
      throw error;
    }
  }

  async getFriendStatus(friendId: string): Promise<string> {
    try {
      await this.delay(500);
      const friend = MOCK_FRIENDS.find(f => f.id === friendId);
      return friend?.status || 'offline';
    } catch (error) {
      console.error('获取好友状态失败:', error);
      throw error;
    }
  }
}

export default new FriendService();
