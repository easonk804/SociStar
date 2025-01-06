import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MapComponent from '../../../components/MapShow/MapComponent';
import { styles } from './styles';

interface ChatRoom {
  id: string;
  title: string;
  description: string;
  participants: number;
  category: string;
}

const HomeScreenContent: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // 模拟加载聊天室数据
  useEffect(() => {
    const loadChatRooms = async () => {
      try {
        // 这里应该是实际的API调用
        const mockData = [
          { 
            id: '1', 
            title: '读书会', 
            description: '一起探讨《置身事内》', 
            participants: 5,
            category: '文化'
          },
          { 
            id: '2', 
            title: '周末远足', 
            description: '本周末组织登山活动', 
            participants: 8,
            category: '运动'
          },
          { 
            id: '3', 
            title: '美食分享', 
            description: '探讨城市美食地图', 
            participants: 12,
            category: '生活'
          },
          { 
            id: '4', 
            title: '电影鉴赏', 
            description: '新片《奥本海默》讨论', 
            participants: 15,
            category: '娱乐'
          },
        ];
        
        setTimeout(() => {
          setChatRooms(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        Alert.alert('错误', '加载聊天室失败，请稍后重试');
      }
    };

    loadChatRooms();
  }, []);

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    // 实现搜索逻辑
    const filteredRooms = chatRooms.filter(room => 
      room.title.toLowerCase().includes(text.toLowerCase()) ||
      room.description.toLowerCase().includes(text.toLowerCase())
    );
    setChatRooms(filteredRooms);
  }, [chatRooms]);

  const handleCreateChatRoom = () => {
    Alert.alert('创建聊天室', '即将开发此功能');
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case '文化':
        return '#4A90E2';
      case '运动':
        return '#50E3C2';
      case '生活':
        return '#F5A623';
      case '娱乐':
        return '#E667AF';
      default:
        return '#8E8E93';
    }
  };

  const renderChatRoomItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity 
      style={styles.chatRoomItem}
      onPress={() => {
        // 直接导航到聊天室详情页面
        navigation.navigate('ChatRoomDetail', {
          roomId: item.id,
          roomName: item.title,
          activeParticipants: item.participants
        });
      }}
    >
      <View style={styles.chatRoomHeader}>
        <View style={[styles.categoryTag, { backgroundColor: getCategoryColor(item.category) }]}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.participantsContainer}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.participantsText}>{item.participants}</Text>
        </View>
      </View>
      <Text style={styles.chatRoomTitle}>{item.title}</Text>
      <Text style={styles.chatRoomDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="搜索聊天室..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapComponent />
      </View>

      <View style={styles.chatListContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>附近的聊天室</Text>
          <TouchableOpacity onPress={() => Alert.alert('筛选', '即将开发此功能')}>
            <Ionicons name="filter" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={chatRooms}
          keyExtractor={(item) => item.id}
          renderItem={renderChatRoomItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatList}
        />
      </View>

      <TouchableOpacity 
        style={styles.createButton}
        onPress={handleCreateChatRoom}
      >
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.createButtonText}>发起聊天室</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenContent;