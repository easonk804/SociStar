import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

interface LocationCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let locationSubscription: Location.LocationSubscription | null = null;

    const getLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 请求位置权限
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (isMounted) {
            setError('需要位置权限才能显示地图位置');
            Alert.alert(
              '权限未授予',
              '需要位置权限才能显示地图位置。请在设置中启用位置权限。'
            );
          }
          return;
        }

        // 配置位置更新
        await Location.enableNetworkProviderAsync();
        
        // 获取用户当前位置（使用最高精度）
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
          maximumAge: 10000, // 只使用最近10秒内的缓存
          timeout: 5000 // 5秒超时
        });

        if (isMounted && location) {
          console.log('位置精度：', location.coords.accuracy, '米');
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy
          });
        }

        // 订阅位置更新
        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 1
          },
          (newLocation) => {
            if (isMounted) {
              console.log('位置更新，精度：', newLocation.coords.accuracy, '米');
              setUserLocation({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
                accuracy: newLocation.coords.accuracy
              });
            }
          }
        );

      } catch (error) {
        if (isMounted) {
          const errorMessage = error instanceof Error ? error.message : '获取位置时出错';
          console.error('位置错误：', errorMessage);
          setError(errorMessage);
          Alert.alert('错误', '无法获取您的位置，请检查GPS是否开启');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    getLocation();

    return () => {
      isMounted = false;
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>正在获取位置...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation?.latitude || 22.78825,
          longitude: userLocation?.longitude || 114.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton
        showsCompass
      >
        {userLocation && (
          <>
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
              }}
              title="我的位置"
              description={`精度：${userLocation.accuracy?.toFixed(1) || '未知'} 米`}
            />
            <Circle
              center={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
              }}
              radius={500}
              strokeColor="rgba(0, 122, 255, 0.5)"
              fillColor="rgba(0, 122, 255, 0.2)"
            />
          </>
        )}
      </MapView>
      {userLocation?.accuracy && (
        <View style={styles.accuracyInfo}>
          <Text style={styles.accuracyText}>
            位置精度：{userLocation.accuracy.toFixed(1)} 米
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  map: {
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorText: {
    color: '#ff3b30',
    textAlign: 'center',
    padding: 20,
  },
  accuracyInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 5,
  },
  accuracyText: {
    fontSize: 12,
    color: '#666',
  }
});

export default MapComponent;