import { Heart, Menu, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { Song } from '../types';

interface HomePageProps {
  song: Song;
  isPlaying: boolean;
  liked: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onToggleLike: () => void;
  onOpenMenu: () => void;
}

export function HomePage({
  song,
  isPlaying,
  liked,
  onPrev,
  onNext,
  onTogglePlay,
  onToggleLike,
  onOpenMenu,
}: HomePageProps) {
  return (
    <div className="home-page fixed-page">
      <div className="player-top-card">
        <img src={song.coverImage} alt={song.album} className="main-cover" />
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
        <div className="progress-row">
          <span>1:08</span>
          <div className="progress-track">
            <div className="progress-fill" />
            <div className="progress-thumb" />
          </div>
          <span>-{song.duration}</span>
        </div>
      </div>

      <div className="home-actions-row">
        <button className={`icon-action ${liked ? 'active-heart' : ''}`} onClick={onToggleLike}>
          <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <button className="icon-action" onClick={onOpenMenu}>
          <Menu size={18} />
        </button>
      </div>

      <div className="wheel-card">
        <button className="wheel-button top-label" onClick={onOpenMenu}>
          MENU
        </button>
        <button className="wheel-button left-icon" onClick={onPrev}>
          <SkipBack size={22} />
        </button>
        <button className="wheel-button right-icon" onClick={onNext}>
          <SkipForward size={22} />
        </button>
        <div className="wheel-select-label">SELECT</div>
        <button className="wheel-center" onClick={onOpenMenu} aria-label="toggle play">
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>
      </div>
    </div>
  );
}
