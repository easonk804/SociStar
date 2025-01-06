import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AvatarProps {
  size?: number;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  size = 50, 
  color = '#007AFF' 
}) => {
  return (
    <View 
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#F1F3F4',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Ionicons 
        name="person" 
        size={size * 0.6} 
        color={color} 
      />
    </View>
  );
};

export default Avatar;
