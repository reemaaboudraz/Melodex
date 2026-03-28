import { Language, ProfileFormValues, ThemeMode, User } from '../types';
import { languageOptions, themeOptions } from '../data/music';

interface ProfilePageProps {
  user: User;
  profileForm: ProfileFormValues;
  onProfileFormChange: (field: keyof ProfileFormValues, value: string) => void;
  onSaveProfile: () => void;
  onThemeChange: (theme: ThemeMode) => void;
  onLanguageChange: (language: Language) => void;
  onDarkModeToggle: () => void;
  onLogout: () => void;
}

export function ProfilePage({
  user,
  profileForm,
  onProfileFormChange,
  onSaveProfile,
  onThemeChange,
  onLanguageChange,
  onDarkModeToggle,
  onLogout,
}: ProfilePageProps) {
  return (
    <div className="tab-page scroll-area">
      <div className="profile-card">
        <img src={user.avatarImage} alt={user.username} className="profile-avatar" />
        <div>
          <h2>{user.firstName} {user.lastName}</h2>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="form-panel slim-panel">
        <label>
          Username
          <input value={profileForm.username} onChange={(event) => onProfileFormChange('username', event.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={profileForm.password} onChange={(event) => onProfileFormChange('password', event.target.value)} />
        </label>
        <label>
          Email
          <input value={user.email} disabled />
        </label>
        <button className="primary-button full-width" onClick={onSaveProfile}>
          Save profile
        </button>
      </div>

      <div className="settings-card-list">
        <div className="settings-card-item">
          <span className="field-label">UI look</span>
          <div className="choice-row">
            {themeOptions.map((option) => (
              <button
                key={option.key}
                className={`pill ${user.theme === option.key ? 'active' : ''}`}
                onClick={() => onThemeChange(option.key as ThemeMode)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings-card-item">
          <span className="field-label">Language</span>
          <div className="choice-row">
            {languageOptions.map((option) => (
              <button
                key={option}
                className={`pill ${user.language === option ? 'active' : ''}`}
                onClick={() => onLanguageChange(option as Language)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-setting">
          <div>
            <span className="field-label">Dark mode</span>
            <strong>{user.darkMode ? 'On' : 'Off'}</strong>
          </div>
          <button className={`switch ${user.darkMode ? 'on' : ''}`} onClick={onDarkModeToggle}>
            <span />
          </button>
        </div>
      </div>

      <button className="secondary-button full-width logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
