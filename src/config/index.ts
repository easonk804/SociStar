// App configuration constants
export const APP_CONFIG = {
  APP_NAME: 'S2T',
  VERSION: '1.0.0',
  API_URL: 'https://api.example.com',
  SOCKET_URL: 'wss://socket.example.com',
  STORAGE_KEYS: {
    AUTH_TOKEN: '@s2t_auth_token',
    USER_INFO: '@s2t_user_info',
    SETTINGS: '@s2t_settings',
  },
  DEFAULT_AVATAR: 'https://via.placeholder.com/150',
  MAP_CONFIG: {
    INITIAL_REGION: {
      latitude: 39.9042,
      longitude: 116.4074,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    ZOOM_LEVEL: 15,
  },
  CHAT_CONFIG: {
    MAX_MESSAGE_LENGTH: 1000,
    MESSAGE_BATCH_SIZE: 20,
    TYPING_TIMEOUT: 3000,
  },
  UPLOAD_CONFIG: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  },
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 50,
  },
  TIMEOUTS: {
    API_REQUEST: 30000, // 30 seconds
    SOCKET_CONNECT: 10000, // 10 seconds
    LOCATION_UPDATE: 60000, // 1 minute
  },
};

export const STORAGE_KEYS = APP_CONFIG.STORAGE_KEYS;

export {
  APP_CONFIG,
};
