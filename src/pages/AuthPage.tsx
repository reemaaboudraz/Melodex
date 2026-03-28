import { AuthView, SignUpFormValues } from '../types';

interface AuthPageProps {
  authView: AuthView;
  loginForm: { username: string; password: string };
  signUpForm: SignUpFormValues;
  onAuthViewChange: (view: AuthView) => void;
  onLoginFormChange: (field: 'username' | 'password', value: string) => void;
  onSignUpFormChange: (field: keyof SignUpFormValues, value: string) => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export function AuthPage({
  authView,
  loginForm,
  signUpForm,
  onAuthViewChange,
  onLoginFormChange,
  onSignUpFormChange,
  onLogin,
  onSignUp,
}: AuthPageProps) {
  return (
    <div className="auth-screen">
      <div className="auth-center scroll-area">
        <img src="/assets/melodex-logo.png" alt="Melodex" className="auth-logo" />
        <p className="auth-tagline">music made personal</p>

        <div className="auth-switcher">
          <button className={authView === 'signup' ? 'active' : ''} onClick={() => onAuthViewChange('signup')}>
            Sign Up
          </button>
          <button className={authView === 'login' ? 'active' : ''} onClick={() => onAuthViewChange('login')}>
            Log In
          </button>
        </div>

        {authView === 'login' ? (
          <div className="form-panel auth-panel compact-panel">
            <label>
              Username
              <input
                value={loginForm.username}
                onChange={(event) => onLoginFormChange('username', event.target.value)}
                placeholder="musiclover"
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) => onLoginFormChange('password', event.target.value)}
                placeholder="001"
              />
            </label>
            <button className="primary-button full-width" onClick={onLogin}>
              Log In
            </button>
            <div className="demo-hint">
              Demo login: <strong>musiclover</strong> / <strong>001</strong>
            </div>
          </div>
        ) : (
          <div className="form-panel auth-panel">
            <label>
              First name
              <input
                value={signUpForm.firstName}
                onChange={(event) => onSignUpFormChange('firstName', event.target.value)}
              />
            </label>
            <label>
              Last name
              <input
                value={signUpForm.lastName}
                onChange={(event) => onSignUpFormChange('lastName', event.target.value)}
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={signUpForm.email}
                onChange={(event) => onSignUpFormChange('email', event.target.value)}
              />
            </label>
            <label>
              Username
              <input
                value={signUpForm.username}
                onChange={(event) => onSignUpFormChange('username', event.target.value)}
              />
            </label>
            <label>
              Password
              <input
                type="password"
                value={signUpForm.password}
                onChange={(event) => onSignUpFormChange('password', event.target.value)}
              />
            </label>
            <button className="primary-button full-width" onClick={onSignUp}>
              Create Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
