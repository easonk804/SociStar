import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: string;
  isRead: boolean;
}

interface ChatScreenParams {
  userId: string;
  userName: string;
  userAvatar: any;
}

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId, userName, userAvatar } = route.params as ChatScreenParams;
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // 模拟当前用户ID
  const currentUserId = 'currentUser';

  // 模拟初始消息数据
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: '1',
        text: '你好！',
        senderId: userId,
        timestamp: '10:00',
        isRead: true,
      },
      {
        id: '2',
        text: '你好！很高兴认识你',
        senderId: currentUserId,
        timestamp: '10:01',
        isRead: true,
      },
      {
        id: '3',
        text: '我看到你也喜欢听音乐',
        senderId: userId,
        timestamp: '10:02',
        isRead: true,
      },
    ];
    setMessages(mockMessages);
  }, [userId]);

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText.trim(),
        senderId: currentUserId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');
      
      // 模拟对方正在输入
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // 模拟对方回复
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: '好的，我明白了！',
          senderId: userId,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false,
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 2000);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === currentUserId;

    return (
      <View style={[
        styles.messageItem,
        isMyMessage ? styles.myMessage : styles.otherMessage
      ]}>
        <View style={styles.messageRow}>
          {!isMyMessage && (
            <Image
              source={userAvatar}
              style={styles.avatar}
            />
          )}
          <View style={[
            styles.messageBubble,
            isMyMessage && styles.myMessageBubble
          ]}>
            <Text style={[
              styles.messageText,
              isMyMessage && styles.myMessageText
            ]}>
              {item.text}
            </Text>
          </View>
        </View>
        <Text style={styles.timeText}>{item.timestamp}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{userName}</Text>
        <View style={styles.headerRight} />
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {isTyping && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#8E8E93" />
          <Text style={styles.typingText}>{userName} 正在输入...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="输入消息..."
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Ionicons name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
