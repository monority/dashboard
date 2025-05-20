import React, { useState } from 'react';
import Input from '../../components/utils/base/Input';
import Badge from '../../components/ui/element/Badges';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '',
    notifications: true,
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <section className="settings">
      <div className="container flex column gap2">
        <div className="wrapper">
          <div className="element">
            <h2>Settings</h2>
          </div>
          <div className="element">
            <p className="text_color02">Manage your account and preferences</p>
          </div>
        </div>

        <div className="box_graph" style={{ maxWidth: 500 }}>
          <div className="wrapper_form">
            <div className="container">
              <div className="element">
                <h4>Profile</h4>
              </div>
              <div className="element">
                <Input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  maxWidth="100%"
                />
              </div>
              <div className="element">
                <Input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  maxWidth="100%"
                />
              </div>
              <div className="element">
                <Input
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  placeholder="New password"
                  maxWidth="100%"
                />
              </div>
            </div>
            <div className="container">
              <div className="element">
                <h4>Preferences</h4>
              </div>
              <div className="element flex row gap1" style={{ alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleChange}
                  style={{ marginRight: 8 }}
                />
                <label htmlFor="notifications">Enable notifications</label>
                {profile.notifications && (
                  <Badge colorBadge="success_light" label="On" />
                )}
                {!profile.notifications && (
                  <Badge colorBadge="negative" label="Off" />
                )}
              </div>
              <div className="element">
                <label htmlFor="theme">Theme</label>
                <select
                  id="theme"
                  name="theme"
                  value={profile.theme}
                  onChange={handleChange}
                  style={{ marginLeft: 8, padding: '0.3em 1em', borderRadius: 6 }}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
            <div className="container">
              <div className="element">
                <button className="btn btn-primary" style={{ width: '100%' }}>
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