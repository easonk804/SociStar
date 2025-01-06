import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapComponent from '../../../components/MapShow/MapComponent';
import { styles } from './styles';

const MapScreen: React.FC = () => {
  const [showMyLocation, setShowMyLocation] = useState(true);
  const [showChatRooms, setShowChatRooms] = useState(true);

  const handleMyLocation = () => {
    setShowMyLocation(!showMyLocation);
  };

  const handleToggleChatRooms = () => {
    setShowChatRooms(!showChatRooms);
  };

  return (
    <View style={styles.container}>
      <MapComponent />
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={handleMyLocation}
        >
          <Ionicons 
            name={showMyLocation ? "location" : "location-outline"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleToggleChatRooms}
        >
          <Ionicons 
            name={showChatRooms ? "chatbubbles" : "chatbubbles-outline"} 
            size={24} 
            color="#007AFF" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.overlay}>
        <Text style={styles.overlayTitle}>附近的聊天室</Text>
        <Text style={styles.overlayText}>
          在地图上显示附近的聊天室和用户
        </Text>
      </View>
    </View>
  );
};

export default MapScreen;
