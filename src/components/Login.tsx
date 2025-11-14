import React, { useState } from 'react';
import { useMatrixClient } from '../hooks/useMatrixClient';

export function Login() {
  const { login, error, isLoading } = useMatrixClient();
  const [homeserver, setHomeserver] = useState('matrix.org');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(homeserver, username, password);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>EBeep - E Ink Matrix Client</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="homeserver">Homeserver</label>
          <input
            id="homeserver"
            type="text"
            value={homeserver}
            onChange={(e) => setHomeserver(e.target.value)}
            placeholder="matrix.org"
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@user:matrix.org"
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isLoading}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}
