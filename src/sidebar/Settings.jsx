import React from 'react';
import '../css/Settings.css';
import { ThemeContext } from '../main/ThemeContext';

function Settings({ onClose }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="settings-modal-content">
      <h2>Settings</h2>
      <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'} theme</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default Settings;
