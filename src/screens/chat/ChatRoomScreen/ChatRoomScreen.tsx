import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import { styles } from './styles';

interface Message {
  id: string;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
  isSystem?: boolean;
}

interface RouteParams {
  roomId: string;
  roomName: string;
}

const ChatRoomScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomId, roomName } = route.params as RouteParams;
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      userId: 'system',
      userName: 'System',
      text: '欢迎来到聊天室',
      timestamp: '12:00',
      isSystem: true,
    },
    {
      id: '2',
      userId: '1',
      userName: '张三',
      text: '大家好！',
      timestamp: '12:01',
    },
    {
      id: '3',
      userId: '2',
      userName: '李四',
      text: '今天天气真不错',
      timestamp: '12:02',
    },
    {
      id: '4',
      userId: 'current',
      userName: '我',
      text: '是啊，适合出去玩',
      timestamp: '12:03',
    },
  ]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    // TODO: 实现发送消息逻辑
    
    setInputMessage('');
    // 滚动到底部
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.isSystem) {
      return (
        <View style={styles.systemMessage}>
          <Text style={styles.systemMessageText}>{item.text}</Text>
        </View>
      );
    }

    const isCurrentUser = item.userId === 'current';
    return (
      <View style={[
        styles.messageItem,
        isCurrentUser && styles.messageItemRight
      ]}>
        <View style={[
          styles.avatarContainer,
          isCurrentUser && styles.avatarContainerRight
        ]}>
          <Avatar size={36} />
        </View>
        <View style={styles.messageContent}>
          <View style={[
            styles.messageBubble,
            isCurrentUser && styles.messageBubbleRight
          ]}>
            <Text style={[
              styles.messageText,
              isCurrentUser && styles.messageTextRight
            ]}>
              {item.text}
            </Text>
          </View>
          <Text style={[
            styles.messageTime,
            isCurrentUser && styles.messageTimeRight
          ]}>
            {item.timestamp}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.roomName}>{roomName}</Text>
          <Text style={styles.participantsCount}>3 人在线</Text>
        </View>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="ellipsis-horizontal" size={24} color="#1C1C1E" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="输入消息..."
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputMessage.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!inputMessage.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color="#FFF"
              style={{ marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoomScreen;
