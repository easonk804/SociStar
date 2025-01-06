import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../../../components/Avatar';
import { styles } from './styles';

interface Member {
  id: string;
  name: string;
  role: string;
}

interface RouteParams {
  roomId: string;
  roomName: string;
  activeParticipants?: number;
}

const ChatRoomDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { roomId, roomName, activeParticipants } = route.params as RouteParams;
  const [hasJoined, setHasJoined] = useState(false);

  const [members] = useState<Member[]>([
    { id: '1', name: '张三', role: '群主' },
    { id: '2', name: '李四', role: '管理员' },
    { id: '3', name: '王五', role: '成员' },
    { id: '4', name: '赵六', role: '成员' },
  ]);

  const handleJoinChat = () => {
    // TODO: 实现加入群聊的API调用
    setHasJoined(true);
    
    // 将聊天室添加到消息列表
    // TODO: 这里应该调用消息列表的更新方法
    
    // 导航到聊天界面
    navigation.navigate('Chat', {
      roomId,
      name: roomName,
      type: 'group'
    });
  };

  const handleLeaveRoom = () => {
    Alert.alert(
      '退出群聊',
      '确定要退出该群聊吗？',
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确定',
          style: 'destructive',
          onPress: () => {
            // TODO: 实现退出群聊逻辑
            setHasJoined(false);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const renderMember = ({ item }: { item: Member }) => (
    <TouchableOpacity style={styles.memberItem}>
      <Avatar size={40} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar size={80} />
        <Text style={styles.roomName}>{roomName}</Text>
        <Text style={styles.roomDescription}>
          这是一个充满活力的聊天室，欢迎大家积极参与讨论！
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{members.length}</Text>
          <Text style={styles.statLabel}>成员</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statLabel}>消息</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>7天</Text>
          <Text style={styles.statLabel}>活跃</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>群成员</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>查看全部</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={members.slice(0, 4)}
          renderItem={renderMember}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          style={styles.membersList}
        />
      </View>

      <View style={styles.actionButtons}>
        {!hasJoined ? (
          <TouchableOpacity 
            style={[styles.actionButton, styles.joinButton]}
            onPress={handleJoinChat}
          >
            <Ionicons
              name="chatbubbles-outline"
              size={24}
              color="#007AFF"
              style={styles.actionIcon}
            />
            <Text style={[styles.actionText, styles.joinButtonText]}>
              加入聊天
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#1C1C1E"
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>消息通知</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="images-outline"
                size={24}
                color="#1C1C1E"
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>群聊图片</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons
                name="search-outline"
                size={24}
                color="#1C1C1E"
                style={styles.actionIcon}
              />
              <Text style={styles.actionText}>搜索聊天记录</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonDanger]}
              onPress={handleLeaveRoom}
            >
              <Ionicons
                name="exit-outline"
                size={24}
                color="#FF3B30"
                style={styles.actionIcon}
              />
              <Text style={[styles.actionText, styles.actionTextDanger]}>
                退出群聊
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default ChatRoomDetailScreen;
