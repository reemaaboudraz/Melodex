import { Search } from 'lucide-react';
import { Playlist, Song } from '../types';

interface BrowsePageProps {
  query: string;
  songs: Song[];
  playlists: Playlist[];
  selectedPlaylistId: string;
  onQueryChange: (value: string) => void;
  onPlaylistSelectionChange: (playlistId: string) => void;
  onAddSong: (songId: string, playlistId: string) => void;
  onPlaySong: (song: Song) => void;
}

export function BrowsePage({
  query,
  songs,
  playlists,
  selectedPlaylistId,
  onQueryChange,
  onPlaylistSelectionChange,
  onAddSong,
  onPlaySong,
}: BrowsePageProps) {
  return (
    <div className="tab-page scroll-area">
      <div className="search-shell">
        <Search size={18} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by artist, album, song, country or era"
        />
      </div>

      <div className="section-copy">
        <h2>Browse music</h2>
        <p>Suggestions appear instantly as you search.</p>
      </div>

      <div className="playlist-picker-card">
        <label>
          Save songs to
          <select value={selectedPlaylistId} onChange={(event) => onPlaylistSelectionChange(event.target.value)}>
            {playlists.map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="song-list">
        {songs.map((song) => (
          <div key={song.id} className="song-row">
            <img src={song.artistImage} alt={song.artist} className="artist-thumb" />
            <div className="song-copy">
              <strong>{song.title}</strong>
              <span>
                {song.artist} · {song.album}
              </span>
              <small>
                {song.country} · {song.category} · {song.era}
              </small>
            </div>
            <div className="song-actions-col">
              <button className="secondary-button" onClick={() => onPlaySong(song)}>
                Open
              </button>
              <button className="primary-button mini-button" onClick={() => onAddSong(song.id, selectedPlaylistId)}>
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
