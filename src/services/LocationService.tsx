import * as Location from 'expo-location';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationPermissionStatus {
  status: Location.PermissionStatus;
  canAskAgain: boolean;
}

interface NearbyUser {
  id: string;
  username: string;
  distance: number;
  location: Coordinates;
}

interface NearbyRoom {
  id: string;
  name: string;
  distance: number;
  location: Coordinates;
  participantsCount: number;
}

class LocationService {
  private async getHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  }

  async requestLocationPermission(): Promise<LocationPermissionStatus> {
    try {
      const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
      return { status, canAskAgain };
    } catch (error) {
      console.error('请求位置权限失败:', error);
      throw error;
    }
  }

  async getCurrentLocation(): Promise<Coordinates> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('没有位置权限');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('获取当前位置失败:', error);
      throw error;
    }
  }

  async updateUserLocation(coordinates: Coordinates): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/users/location`, {
        method: 'PUT',
        headers: await this.getHeaders(),
        body: JSON.stringify(coordinates),
      });

      await this.handleResponse<void>(response);
    } catch (error) {
      console.error('更新用户位置失败:', error);
      throw error;
    }
  }

  async getNearbyUsers(
    coordinates: Coordinates,
    radius: number = 5000
  ): Promise<NearbyUser[]> {
    try {
      const queryParams = new URLSearchParams({
        latitude: coordinates.latitude.toString(),
        longitude: coordinates.longitude.toString(),
        radius: radius.toString(),
      });

      const response = await fetch(
        `${API_URL}/users/nearby?${queryParams}`,
        {
          headers: await this.getHeaders(),
        }
      );

      return this.handleResponse<NearbyUser[]>(response);
    } catch (error) {
      console.error('获取附近用户失败:', error);
      throw error;
    }
  }

  async getNearbyRooms(
    coordinates: Coordinates,
    radius: number = 5000
  ): Promise<NearbyRoom[]> {
    try {
      const queryParams = new URLSearchParams({
        latitude: coordinates.latitude.toString(),
        longitude: coordinates.longitude.toString(),
        radius: radius.toString(),
      });

      const response = await fetch(
        `${API_URL}/rooms/nearby?${queryParams}`,
        {
          headers: await this.getHeaders(),
        }
      );

      return this.handleResponse<NearbyRoom[]>(response);
    } catch (error) {
      console.error('获取附近聊天室失败:', error);
      throw error;
    }
  }

  async calculateDistance(
    origin: Coordinates,
    destination: Coordinates
  ): Promise<number> {
    try {
      const queryParams = new URLSearchParams({
        originLat: origin.latitude.toString(),
        originLng: origin.longitude.toString(),
        destLat: destination.latitude.toString(),
        destLng: destination.longitude.toString(),
      });

      const response = await fetch(
        `${API_URL}/location/distance?${queryParams}`,
        {
          headers: await this.getHeaders(),
        }
      );

      const data = await this.handleResponse<{ distance: number }>(response);
      return data.distance;
    } catch (error) {
      console.error('计算距离失败:', error);
      throw error;
    }
  }

  async watchLocation(
    callback: (location: Coordinates) => void,
    errorCallback?: (error: any) => void
  ): Promise<Location.LocationSubscription> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        throw new Error('没有位置权限');
      }

      return await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          callback({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    } catch (error) {
      console.error('监听位置变化失败:', error);
      if (errorCallback) {
        errorCallback(error);
      }
      throw error;
    }
  }

  async geocodeLocation(address: string): Promise<Coordinates> {
    try {
      const results = await Location.geocodeAsync(address);
      
      if (results.length === 0) {
        throw new Error('地址解析失败');
      }

      return {
        latitude: results[0].latitude,
        longitude: results[0].longitude,
      };
    } catch (error) {
      console.error('地址解析失败:', error);
      throw error;
    }
  }

  async reverseGeocodeLocation(
    coordinates: Coordinates
  ): Promise<Location.LocationGeocodedAddress[]> {
    try {
      const results = await Location.reverseGeocodeAsync(coordinates);
      return results;
    } catch (error) {
      console.error('反向地址解析失败:', error);
      throw error;
    }
  }
}

export default new LocationService();
