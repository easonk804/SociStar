import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Map: undefined;
  Profile: undefined;
  Friends: undefined;
  Message: undefined;
  Chat: {
    userId: string;
    userName: string;
    userAvatar: any;
  };
  ChatRoom: undefined;
  ChatRoomDetail: {
    roomId: string;
    roomName: string;
    activeParticipants: number;
  };
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  主页: undefined;
  好友: undefined;
  消息: undefined;
  个人: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
