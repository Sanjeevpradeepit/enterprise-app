import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (
    accessToken: string,
    refreshToken: string,
    user: User,
  ) => void;

  logout: () => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore =
  create<AuthState>(set => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
    login: (
      accessToken,
      refreshToken,
      user,
    ) =>
      set({
        isAuthenticated: true,
        accessToken,
        refreshToken,
        user,
      }),

    logout: () =>
      set({
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      }),

    setUser: user =>
      set({
        user,
      }),

    setAccessToken: accessToken =>
      set({
        accessToken,
      }),
  }));





//   Usage
// Login
// const login = useAuthStore(
//   state => state.login,
// );

// login(
//   accessToken,
//   refreshToken,
//   user,
// );
// Logout
// const logout = useAuthStore(
//   state => state.logout,
// );

// logout();
// Current User
// const user = useAuthStore(
//   state => state.user,
// );
// Theme
// const mode = useThemeStore(
//   state => state.mode,
// );

// const toggleTheme =
//   useThemeStore(
//     state => state.toggleTheme,
//   );
// Settings
// const notifications =
//   useSettingsStore(
//     state =>
//       state.notificationEnabled,
//   );

// const enableNotifications =
//   useSettingsStore(
//     state =>
//       state.enableNotifications,
//   );