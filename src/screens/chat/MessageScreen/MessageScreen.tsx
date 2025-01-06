import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import { styles } from './styles';

interface Message {
  id: string;
  userId: string;
  userName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

const MessageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      userId: '1',
      userName: '阅读群',
      lastMessage: '下周二晚上8点讨论《置身事内》',
      timestamp: '10:30',
      unreadCount: 3,
      isOnline: true,
    },
    {
      id: '2',
      userId: '2',
      userName: '远足群',
      lastMessage: '本周日天气不错，适合爬山',
      timestamp: '昨天',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: '3',
      userId: '3',
      userName: '美食分享群',
      lastMessage: '推荐一家新开的火锅店',
      timestamp: '周一',
      unreadCount: 1,
      isOnline: true,
    },
  ]);

  const handleMessagePress = (message: Message) => {
    navigation.navigate('Chat', {
      userId: message.userId,
      userName: message.userName,
    });
  };

  const renderMessageItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => handleMessagePress(item)}
    >
      <View style={styles.avatarContainer}>
        <Avatar size={50} />
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{item.userName}</Text>
          <Text style={styles.timeStamp}>{item.timestamp}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text 
            style={styles.lastMessage}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.lastMessage}
          </Text>
          {item.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="chatbubbles-outline"
        size={48}
        color="#999"
        style={styles.emptyIcon}
      />
      <Text style={styles.emptyText}>暂无消息</Text>
      <Text style={styles.emptySubText}>
        去附近的聊天室找些有趣的话题吧
      </Text>
    </View>
  );

  const filteredMessages = messages.filter(message =>
    message.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            placeholder="搜索消息"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </View>

      <FlatList
        data={filteredMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

export default MessageScreen;
