import React, { useState } from 'react';
import Input from '../../components/utils/base/Input';
import Badge from '../../components/ui/element/Badges';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <section className="settings">
      <div className="container flex column gap2">
        <div className="settings__header">
          <h2>Settings</h2>
          <p className="text_color02">Manage your account and preferences</p>
        </div>

        <div className="box_graph settings__card">
          <div className="wrapper_form">
            <div className="container">
              <div className="element">
                <h4>Profile</h4>
              </div>
              <div className="element">
                <Input
                  type="text"
                  name="name"
                  initialValue="John Doe"
                  placeholder="Your name"
                  inputClassName="input_search"
                />
              </div>
              <div className="element">
                <Input
                  type="email"
                  name="email"
                  initialValue="john@example.com"
                  placeholder="Your email"
                  inputClassName="input_search"
                />
              </div>
              <div className="element">
                <Input
                  type="password"
                  name="password"
                  placeholder="New password"
                  inputClassName="input_search"
                />
              </div>
            </div>
            <div className="container">
              <div className="element">
                <h4>Preferences</h4>
              </div>
              <div className="element settings__checkbox_row">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <label htmlFor="notifications">Enable notifications</label>
                {notifications && (
                  <Badge colorBadge="success_light" label="On" />
                )}
                {!notifications && (
                  <Badge colorBadge="negative" label="Off" />
                )}
              </div>
              <div className="element settings__select_wrapper">
                <label className="settings__label" htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="settings__select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
            <div className="container">
              <div className="element">
                <button className="settings__save">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;