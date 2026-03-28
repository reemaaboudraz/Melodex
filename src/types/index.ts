export type ThemeMode = 'retro-pink' | 'classic-ipod' | 'neon-dark';
export type Language = 'English' | 'العربية' | 'Français';
export type TabKey = 'home' | 'browse' | 'playlists' | 'profile';
export type AuthView = 'login' | 'signup';

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  era: '80s' | '90s' | '2000s';
  country: string;
  category: string;
  duration: string;
  coverImage: string;
  artistImage: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  songIds: string[];
  locked?: boolean;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  avatarImage: string;
  theme: ThemeMode;
  language: Language;
  darkMode: boolean;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export interface ProfileFormValues {
  username: string;
  password: string;
}
