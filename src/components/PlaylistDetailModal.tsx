import { Song, Playlist } from '../types';

interface PlaylistDetailModalProps {
  playlist: Playlist;
  songs: Song[];
  editMode: boolean;
  onRemoveSong: (songId: string) => void;
  onClose: () => void;
}

export function PlaylistDetailModal({ playlist, songs, editMode, onRemoveSong, onClose }: PlaylistDetailModalProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card details-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
          </div>
          <button className="text-button" onClick={onClose}>
            Done
          </button>
        </div>

        <div className="modal-song-list scroll-area">
          {songs.length === 0 ? (
            <div className="empty-card">No songs yet.</div>
          ) : (
            songs.map((song) => (
              <div key={song.id} className="song-row modal-song-row">
                <img src={song.coverImage} alt={song.album} className="song-cover-sm" />
                <div className="song-copy">
                  <strong>{song.title}</strong>
                  <span>{song.artist}</span>
                </div>
                {editMode && (
                  <button className="icon-action danger" onClick={() => onRemoveSong(song.id)}>
                    Remove
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
