import { Home, ListMusic, Search, UserRound } from 'lucide-react';
import { TabKey } from '../types';

interface BottomNavProps {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

const items: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'browse', label: 'Browse', icon: Search },
  { key: 'playlists', label: 'Playlists', icon: ListMusic },
  { key: 'profile', label: 'Profile', icon: UserRound },
];

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          className={`nav-button ${activeTab === key ? 'active' : ''}`}
          onClick={() => onChange(key)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
