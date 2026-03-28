import { Language, ThemeMode } from '../types';

interface MenuOverlayProps {
  language: Language;
  darkMode: boolean;
  theme: ThemeMode;
  onLanguageChange: (language: Language) => void;
  onDarkModeToggle: () => void;
  onClose: () => void;
}

export function MenuOverlay({
  language,
  darkMode,
  theme,
  onLanguageChange,
  onDarkModeToggle,
  onClose,
}: MenuOverlayProps) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card menu-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h3>Menu</h3>
          <button className="text-button" onClick={onClose}>
            Done
          </button>
        </div>

        <div className="stack-sm">
          <label className="field-label">Language</label>
          <div className="choice-row">
            {(['English', 'العربية', 'Français'] as Language[]).map((option) => (
              <button
                key={option}
                className={`pill ${language === option ? 'active' : ''}`}
                onClick={() => onLanguageChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-setting">
          <div>
            <span className="field-label">Mode</span>
            <strong>{darkMode ? 'Dark On' : 'Dark Off'}</strong>
          </div>
          <button className={`switch ${darkMode ? 'on' : ''}`} onClick={onDarkModeToggle}>
            <span />
          </button>
        </div>

        <div className="menu-theme-note">Current style: {theme.replace('-', ' ')}</div>
      </div>
    </div>
  );
}
