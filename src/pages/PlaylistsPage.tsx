import { Pencil, Plus, Share2 } from 'lucide-react';
import { Playlist, Song } from '../types';

interface PlaylistsPageProps {
  playlists: Playlist[];
  songsByPlaylist: Record<string, Song[]>;
  draftName: string;
  draftDescription: string;
  onDraftNameChange: (value: string) => void;
  onDraftDescriptionChange: (value: string) => void;
  onCreatePlaylist: () => void;
  onOpenDetails: (playlist: Playlist) => void;
  onToggleEdit: (playlistId: string) => void;
  onOpenShare: (playlist: Playlist) => void;
  editingPlaylistId: string | null;
}

export function PlaylistsPage({
  playlists,
  songsByPlaylist,
  draftName,
  draftDescription,
  onDraftNameChange,
  onDraftDescriptionChange,
  onCreatePlaylist,
  onOpenDetails,
  onToggleEdit,
  onOpenShare,
  editingPlaylistId,
}: PlaylistsPageProps) {
  return (
    <div className="tab-page scroll-area">
      <div className="section-copy">
        <h2>Your playlists</h2>
        <p>Open one to view details, edit songs, or share it.</p>
      </div>

      <div className="form-panel slim-panel">
        <label>
          New playlist name
          <input value={draftName} onChange={(event) => onDraftNameChange(event.target.value)} />
        </label>
        <label>
          Description
          <input value={draftDescription} onChange={(event) => onDraftDescriptionChange(event.target.value)} />
        </label>
        <button className="primary-button full-width" onClick={onCreatePlaylist}>
          <Plus size={16} /> Create playlist
        </button>
      </div>

      <div className="playlist-grid">
        {playlists.map((playlist) => {
          const songCount = songsByPlaylist[playlist.id]?.length ?? 0;
          return (
            <div key={playlist.id} className="playlist-card">
              <div>
                <h3>{playlist.name}</h3>
                <p>{playlist.description}</p>
                <small>{songCount} songs</small>
              </div>
              <div className="playlist-card-actions">
                <button className="secondary-button" onClick={() => onOpenDetails(playlist)}>
                  View details
                </button>
                <button className={`secondary-button ${editingPlaylistId === playlist.id ? 'active-soft' : ''}`} onClick={() => onToggleEdit(playlist.id)}>
                  <Pencil size={14} /> {editingPlaylistId === playlist.id ? 'Editing' : 'Edit'}
                </button>
                <button className="secondary-button" onClick={() => onOpenShare(playlist)}>
                  <Share2 size={14} /> Share
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
