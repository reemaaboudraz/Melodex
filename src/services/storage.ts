import { demoUser, starterPlaylists } from '../data/music';
import { Playlist, SignUpFormValues, User } from '../types';

const USERS_KEY = 'melodex_users';
const CURRENT_USER_KEY = 'melodex_current_user';
const PLAYLISTS_KEY = 'melodex_playlists';

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function bootstrapUsers(): User[] {
  const stored = safeParse<User[]>(localStorage.getItem(USERS_KEY), []);
  const withoutDemo = stored.filter((user) => user.username !== demoUser.username);
  const merged = [demoUser, ...withoutDemo];
  localStorage.setItem(USERS_KEY, JSON.stringify(merged));
  return merged;
}

export function getUsers(): User[] {
  return bootstrapUsers();
}

export function saveUsers(users: User[]) {
  const withoutDemo = users.filter((user) => user.username !== demoUser.username);
  localStorage.setItem(USERS_KEY, JSON.stringify([demoUser, ...withoutDemo]));
}

export function getCurrentUsername(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

export function setCurrentUsername(username: string | null) {
  if (!username) {
    localStorage.removeItem(CURRENT_USER_KEY);
    return;
  }
  localStorage.setItem(CURRENT_USER_KEY, username);
}

function ensureBasePlaylists(playlists: Playlist[]): Playlist[] {
  const liked = playlists.find((playlist) => playlist.id === 'liked');
  const rest = playlists.filter((playlist) => playlist.id !== 'liked');

  return [
    {
      id: 'liked',
      name: 'Liked',
      description: 'Songs you hearted from the player and browse page.',
      songIds: liked?.songIds ?? starterPlaylists[0].songIds,
      locked: true,
    },
    ...rest,
  ];
}

export function getUserPlaylists(username: string): Playlist[] {
  const all = safeParse<Record<string, Playlist[]>>(localStorage.getItem(PLAYLISTS_KEY), {});

  if (!all[username]) {
    all[username] = starterPlaylists;
  }

  all[username] = ensureBasePlaylists(all[username]);
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(all));
  return all[username];
}

export function saveUserPlaylists(username: string, playlists: Playlist[]) {
  const all = safeParse<Record<string, Playlist[]>>(localStorage.getItem(PLAYLISTS_KEY), {});
  all[username] = ensureBasePlaylists(playlists);
  localStorage.setItem(PLAYLISTS_KEY, JSON.stringify(all));
}

export function createUserAccount(values: SignUpFormValues): User {
  const user: User = {
    ...values,
    avatarImage: '/assets/artists/demo-user.png',
    theme: 'retro-pink',
    language: 'English',
    darkMode: false,
  };

  const users = getUsers();
  saveUsers([...users, user]);
  saveUserPlaylists(user.username, starterPlaylists);
  setCurrentUsername(user.username);
  return user;
}
