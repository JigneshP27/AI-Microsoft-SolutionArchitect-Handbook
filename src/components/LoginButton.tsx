import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import styles from './LoginButton.module.css';

export default function LoginButton() {
  const { user, loading, signInWithGoogle, signInWithGithub, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  if (loading) {
    return <div className="navbar__item">Loading...</div>;
  }

  if (user) {
    return (
      <div 
        className={`navbar__item ${styles.userMenu}`}
        onMouseEnter={() => setShowDropdown(true)}
        onMouseLeave={() => setShowDropdown(false)}
      >
        <img 
          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.email}`} 
          alt="Profile" 
          className={styles.avatar} 
        />
        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.userInfo}>
              <strong>{user.displayName || 'User'}</strong>
              <small>{user.email}</small>
            </div>
            <button className={styles.logoutButton} onClick={logout}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`navbar__item ${styles.loginMenu}`}
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <button className="button button--primary button--sm">Sign In</button>
      {showDropdown && (
        <div className={styles.dropdown}>
          <button className={styles.authButton} onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <button className={styles.authButton} onClick={signInWithGithub}>
            Sign in with GitHub
          </button>
        </div>
      )}
    </div>
  );
}
