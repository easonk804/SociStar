import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FriendService from '../../../services/FriendService';
import Avatar from '../../../components/Avatar';
import { styles } from './styles';

interface Friend {
  id: string;
  name: string;
  status: string;
  isPending?: boolean;
}

const FriendsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'requests'>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [friendsData, requestsData] = await Promise.all([
        FriendService.getFriendsList(),
        FriendService.getFriendRequests(),
      ]);
      setFriends(friendsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('加载好友数据失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptRequest = async (friendId: string) => {
    try {
      await FriendService.acceptFriendRequest(friendId);
      // 重新加载数据
      loadData();
    } catch (error) {
      console.error('接受好友请求失败:', error);
    }
  };

  const handleRejectRequest = async (friendId: string) => {
    try {
      await FriendService.rejectFriendRequest(friendId);
      // 重新加载数据
      loadData();
    } catch (error) {
      console.error('拒绝好友请求失败:', error);
    }
  };

  const renderFriendItem = ({ item }: { item: Friend }) => (
    <TouchableOpacity style={styles.friendItem}>
      <Avatar size={50} />
      <View style={styles.friendInfo}>
        <Text style={styles.friendName}>{item.name}</Text>
        <Text style={styles.friendStatus}>{item.status}</Text>
      </View>
      {item.isPending && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={[styles.actionButton, { marginRight: 8 }]}
            onPress={() => handleAcceptRequest(item.id)}
          >
            <Text style={styles.actionButtonText}>接受</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.pendingButton]}
            onPress={() => handleRejectRequest(item.id)}
          >
            <Text style={styles.actionButtonText}>拒绝</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={activeTab === 'friends' ? 'people-outline' : 'mail-outline'}
        size={48}
        color="#999"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyText}>
        {activeTab === 'friends' ? '还没有好友' : '没有新的好友请求'}
      </Text>
      <Text style={styles.emptySubText}>
        {activeTab === 'friends'
          ? '去发现页面找到新朋友吧'
          : '有新的好友请求时会通知你'}
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索好友"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.segmentedControl}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === 'friends' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('friends')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'friends' && styles.segmentTextActive,
            ]}
          >
            好友
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === 'requests' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('requests')}
        >
          <Text
            style={[
              styles.segmentText,
              activeTab === 'requests' && styles.segmentTextActive,
            ]}
          >
            请求
            {requests.length > 0 && ` (${requests.length})`}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'friends' ? friends : requests}
        renderItem={renderFriendItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.friendsList}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default FriendsScreen;