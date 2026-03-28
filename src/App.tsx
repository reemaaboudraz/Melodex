import { useEffect, useMemo, useState } from 'react';
import { PhoneFrame } from './components/PhoneFrame';
import { StatusBar } from './components/StatusBar';
import { BottomNav } from './components/BottomNav';
import { MenuOverlay } from './components/MenuOverlay';
import { ShareModal } from './components/ShareModal';
import { PlaylistDetailModal } from './components/PlaylistDetailModal';
import { AuthPage } from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { PlaylistsPage } from './pages/PlaylistsPage';
import { ProfilePage } from './pages/ProfilePage';
import { songs } from './data/music';
import { bootstrapUsers, createUserAccount, getCurrentUsername, getUserPlaylists, getUsers, saveUserPlaylists, saveUsers, setCurrentUsername } from './services/storage';
import { AuthView, Language, Playlist, ProfileFormValues, SignUpFormValues, Song, TabKey, ThemeMode, User } from './types';

const emptySignUp: SignUpFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
};

const emptyProfile: ProfileFormValues = {
  username: '',
  password: '',
};

export default function App() {
  const [authView, setAuthView] = useState<AuthView>('login');
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [currentSongId, setCurrentSongId] = useState('3');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loginForm, setLoginForm] = useState({ username: 'musiclover', password: '001' });
  const [signUpForm, setSignUpForm] = useState<SignUpFormValues>(emptySignUp);
  const [profileForm, setProfileForm] = useState<ProfileFormValues>(emptyProfile);
  const [browseQuery, setBrowseQuery] = useState('');
  const [selectedPlaylistId, setSelectedPlaylistId] = useState('liked');
  const [playlistDraftName, setPlaylistDraftName] = useState('');
  const [playlistDraftDescription, setPlaylistDraftDescription] = useState('');
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [detailsPlaylist, setDetailsPlaylist] = useState<Playlist | null>(null);
  const [sharePlaylist, setSharePlaylist] = useState<Playlist | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('Welcome to Melodex');

  useEffect(() => {
    const seededUsers = bootstrapUsers();
    setUsers(seededUsers);

    const savedUsername = getCurrentUsername();
    const savedUser = seededUsers.find((user) => user.username === savedUsername) ?? null;

    if (savedUser) {
      hydrateUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2300);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const currentSong = songs.find((song) => song.id === currentSongId) ?? songs[0];
  const likedPlaylist = playlists.find((playlist) => playlist.id === 'liked');
  const likedSongIds = likedPlaylist?.songIds ?? [];
  const isLiked = likedSongIds.includes(currentSong.id);

  const filteredSongs = useMemo(() => {
    const query = browseQuery.trim().toLowerCase();
    if (!query) return songs;
    return songs.filter((song) =>
      [song.title, song.artist, song.album, song.country, song.category, song.era]
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [browseQuery]);

  const songsByPlaylist = useMemo(
    () =>
      playlists.reduce<Record<string, Song[]>>((acc, playlist) => {
        acc[playlist.id] = playlist.songIds
          .map((songId) => songs.find((song) => song.id === songId))
          .filter(Boolean) as Song[];
        return acc;
      }, {}),
    [playlists],
  );

  const appClassName = `app-shell theme-${currentUser?.theme ?? 'retro-pink'} ${currentUser?.darkMode ? 'forced-dark' : ''}`;

  function hydrateUser(user: User) {
    setCurrentUser(user);
    setUsers(getUsers());
    const userPlaylists = getUserPlaylists(user.username);
    setPlaylists(userPlaylists);
    setSelectedPlaylistId(userPlaylists[0]?.id ?? 'liked');
    setProfileForm({ username: user.username, password: user.password });
  }

  function persistUser(updatedUser: User) {
    const nextUsers = users.map((user) => (user.email === updatedUser.email ? updatedUser : user));
    saveUsers(nextUsers);
    setUsers(getUsers());
    setCurrentUser(updatedUser);
    setProfileForm({ username: updatedUser.username, password: updatedUser.password });
  }

  function handleLogin() {
    const username = loginForm.username.trim();
    const password = loginForm.password.trim();
    const allUsers = getUsers();
    const foundUser = allUsers.find((user) => user.username === username && user.password === password);

    if (!foundUser) {
      setToast('Invalid username or password');
      return;
    }

    setCurrentUsername(foundUser.username);
    hydrateUser(foundUser);
    setToast(`Welcome back, ${foundUser.firstName}`);
  }

  function handleSignUp() {
    const values = Object.fromEntries(
      Object.entries(signUpForm).map(([key, value]) => [key, value.trim()]),
    ) as SignUpFormValues;

    if (Object.values(values).some((value) => !value)) {
      setToast('Please complete all sign up fields');
      return;
    }

    const allUsers = getUsers();
    if (allUsers.some((user) => user.username.toLowerCase() === values.username.toLowerCase())) {
      setToast('That username already exists');
      return;
    }

    if (allUsers.some((user) => user.email.toLowerCase() === values.email.toLowerCase())) {
      setToast('That email is already in use');
      return;
    }

    const newUser = createUserAccount(values);
    hydrateUser(newUser);
    setSignUpForm(emptySignUp);
    setAuthView('login');
    setToast(`Account created for ${newUser.firstName}`);
  }

  function logout() {
    setCurrentUsername(null);
    setCurrentUser(null);
    setPlaylists([]);
    setActiveTab('home');
    setAuthView('login');
    setLoginForm({ username: 'musiclover', password: '001' });
    setToast('Logged out');
  }

  function cycleSong(direction: 1 | -1) {
    const currentIndex = songs.findIndex((song) => song.id === currentSongId);
    const nextIndex = (currentIndex + direction + songs.length) % songs.length;
    setCurrentSongId(songs[nextIndex].id);
    setIsPlaying(true);
  }

  function openSong(song: Song) {
    setCurrentSongId(song.id);
    setActiveTab('home');
    setIsPlaying(true);
    setToast(`Now playing ${song.title}`);
  }

  function updatePlaylists(nextPlaylists: Playlist[]) {
    if (!currentUser) return;
    setPlaylists(nextPlaylists);
    saveUserPlaylists(currentUser.username, nextPlaylists);
  }

  function addSongToPlaylist(songId: string, playlistId: string) {
    const target = playlists.find((playlist) => playlist.id === playlistId);
    if (!target) return;

    const nextPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId && !playlist.songIds.includes(songId)
        ? { ...playlist, songIds: [...playlist.songIds, songId] }
        : playlist,
    );

    updatePlaylists(nextPlaylists);
    const song = songs.find((entry) => entry.id === songId);
    setToast(`${song?.title} saved to ${target.name}`);
  }

  function toggleLikedSong(songId: string) {
    const nextPlaylists = playlists.map((playlist) => {
      if (playlist.id !== 'liked') return playlist;
      const exists = playlist.songIds.includes(songId);
      return {
        ...playlist,
        songIds: exists ? playlist.songIds.filter((id) => id !== songId) : [...playlist.songIds, songId],
      };
    });

    updatePlaylists(nextPlaylists);
    setToast(likedSongIds.includes(songId) ? 'Removed from Liked' : 'Saved to Liked');
  }

  function createPlaylist() {
    if (!playlistDraftName.trim()) {
      setToast('Give your playlist a name');
      return;
    }

    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name: playlistDraftName.trim(),
      description: playlistDraftDescription.trim() || 'A Melodex custom playlist.',
      songIds: [],
    };

    const nextPlaylists = [...playlists, newPlaylist];
    updatePlaylists(nextPlaylists);
    setSelectedPlaylistId(newPlaylist.id);
    setPlaylistDraftName('');
    setPlaylistDraftDescription('');
    setToast(`Created ${newPlaylist.name}`);
  }

  function removeSongFromPlaylist(playlistId: string, songId: string) {
    const nextPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId ? { ...playlist, songIds: playlist.songIds.filter((id) => id !== songId) } : playlist,
    );
    updatePlaylists(nextPlaylists);
    const updatedPlaylist = nextPlaylists.find((playlist) => playlist.id === playlistId) ?? null;
    setDetailsPlaylist(updatedPlaylist);
    setToast('Song removed');
  }

  function saveProfile() {
    if (!currentUser) return;
    const nextUsername = profileForm.username.trim();
    const nextPassword = profileForm.password.trim();

    if (!nextUsername || !nextPassword) {
      setToast('Username and password cannot be empty');
      return;
    }

    const duplicateUser = users.find(
      (user) => user.username.toLowerCase() === nextUsername.toLowerCase() && user.email !== currentUser.email,
    );

    if (duplicateUser) {
      setToast('That username is already taken');
      return;
    }

    const updatedUser = { ...currentUser, username: nextUsername, password: nextPassword };

    const playlistMap = JSON.parse(localStorage.getItem('melodex_playlists') || '{}') as Record<string, Playlist[]>;
    if (currentUser.username !== nextUsername) {
      playlistMap[nextUsername] = playlistMap[currentUser.username] ?? playlists;
      delete playlistMap[currentUser.username];
      localStorage.setItem('melodex_playlists', JSON.stringify(playlistMap));
      setCurrentUsername(nextUsername);
    }

    persistUser(updatedUser);
    setToast('Profile updated');
  }

  function updateLanguage(language: Language) {
    if (!currentUser) return;
    persistUser({ ...currentUser, language });
  }

  function updateTheme(theme: ThemeMode) {
    if (!currentUser) return;
    persistUser({ ...currentUser, theme, darkMode: theme === 'neon-dark' ? true : currentUser.darkMode });
  }

  function toggleDarkMode() {
    if (!currentUser) return;
    persistUser({ ...currentUser, darkMode: !currentUser.darkMode });
  }

  if (!currentUser) {
    return (
      <PhoneFrame>
        <div className={`app-shell theme-retro-pink`}>
          <StatusBar />
          <AuthPage
            authView={authView}
            loginForm={loginForm}
            signUpForm={signUpForm}
            onAuthViewChange={setAuthView}
            onLoginFormChange={(field, value) => setLoginForm((current) => ({ ...current, [field]: value }))}
            onSignUpFormChange={(field, value) => setSignUpForm((current) => ({ ...current, [field]: value }))}
            onLogin={handleLogin}
            onSignUp={handleSignUp}
          />
          {toast && <div className="toast">{toast}</div>}
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <div className={appClassName}>
        <StatusBar />
        <div className="screen-shell">
          {activeTab === 'home' && (
            <HomePage
              song={currentSong}
              isPlaying={isPlaying}
              liked={isLiked}
              onPrev={() => cycleSong(-1)}
              onNext={() => cycleSong(1)}
              onTogglePlay={() => setIsPlaying((value) => !value)}
              onToggleLike={() => toggleLikedSong(currentSong.id)}
              onOpenMenu={() => setMenuOpen(true)}
            />
          )}

          {activeTab === 'browse' && (
            <BrowsePage
              query={browseQuery}
              songs={filteredSongs}
              playlists={playlists}
              selectedPlaylistId={selectedPlaylistId}
              onQueryChange={setBrowseQuery}
              onPlaylistSelectionChange={setSelectedPlaylistId}
              onAddSong={addSongToPlaylist}
              onPlaySong={openSong}
            />
          )}

          {activeTab === 'playlists' && (
            <PlaylistsPage
              playlists={playlists}
              songsByPlaylist={songsByPlaylist}
              draftName={playlistDraftName}
              draftDescription={playlistDraftDescription}
              onDraftNameChange={setPlaylistDraftName}
              onDraftDescriptionChange={setPlaylistDraftDescription}
              onCreatePlaylist={createPlaylist}
              onOpenDetails={setDetailsPlaylist}
              onToggleEdit={(playlistId) => setEditingPlaylistId((current) => (current === playlistId ? null : playlistId))}
              onOpenShare={setSharePlaylist}
              editingPlaylistId={editingPlaylistId}
            />
          )}

          {activeTab === 'profile' && (
            <ProfilePage
              user={currentUser}
              profileForm={profileForm}
              onProfileFormChange={(field, value) => setProfileForm((current) => ({ ...current, [field]: value }))}
              onSaveProfile={saveProfile}
              onThemeChange={updateTheme}
              onLanguageChange={updateLanguage}
              onDarkModeToggle={toggleDarkMode}
              onLogout={logout}
            />
          )}
        </div>
        <BottomNav activeTab={activeTab} onChange={setActiveTab} />

        {menuOpen && (
          <MenuOverlay
            language={currentUser.language}
            darkMode={currentUser.darkMode}
            theme={currentUser.theme}
            onLanguageChange={updateLanguage}
            onDarkModeToggle={toggleDarkMode}
            onClose={() => setMenuOpen(false)}
          />
        )}

        {detailsPlaylist && (
          <PlaylistDetailModal
            playlist={detailsPlaylist}
            songs={songsByPlaylist[detailsPlaylist.id] ?? []}
            editMode={editingPlaylistId === detailsPlaylist.id}
            onRemoveSong={(songId) => removeSongFromPlaylist(detailsPlaylist.id, songId)}
            onClose={() => setDetailsPlaylist(null)}
          />
        )}

        {sharePlaylist && (
          <ShareModal
            title={sharePlaylist.name}
            onSelect={(channel) => {
              setToast(`Share ${sharePlaylist.name} via ${channel}`);
              setSharePlaylist(null);
            }}
            onClose={() => setSharePlaylist(null)}
          />
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </PhoneFrame>
  );
}
