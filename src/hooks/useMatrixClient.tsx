import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as sdk from 'matrix-js-sdk';
import { MatrixClient } from 'matrix-js-sdk';
import { MatrixContextType } from '../types';

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

interface MatrixProviderProps {
  children: ReactNode;
}

export function MatrixProvider({ children }: MatrixProviderProps) {
  const [client, setClient] = useState<MatrixClient | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Try to restore session on mount
  useEffect(() => {
    const storedSession = localStorage.getItem('matrix_session');
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        const restoredClient = sdk.createClient({
          baseUrl: session.baseUrl,
          accessToken: session.accessToken,
          userId: session.userId,
        });

        setClient(restoredClient);
        setIsLoggedIn(true);

        // Start the client
        restoredClient.startClient({ initialSyncLimit: 10 }).catch(err => {
          console.error('Error starting client:', err);
          setError('Failed to connect to server');
          setIsLoggedIn(false);
          setClient(null);
          localStorage.removeItem('matrix_session');
        });
      } catch (err) {
        console.error('Error restoring session:', err);
        localStorage.removeItem('matrix_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (homeserver: string, username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Ensure homeserver URL is properly formatted
      const baseUrl = homeserver.startsWith('http') ? homeserver : `https://${homeserver}`;

      const tempClient = sdk.createClient({ baseUrl });
      const response = await tempClient.login('m.login.password', {
        user: username,
        password: password,
      });

      const newClient = sdk.createClient({
        baseUrl,
        accessToken: response.access_token,
        userId: response.user_id,
      });

      // Store session
      const session = {
        baseUrl,
        accessToken: response.access_token,
        userId: response.user_id,
      };
      localStorage.setItem('matrix_session', JSON.stringify(session));

      setClient(newClient);
      setIsLoggedIn(true);

      // Start the client
      await newClient.startClient({ initialSyncLimit: 10 });
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
      setIsLoggedIn(false);
      setClient(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (client) {
        await client.logout();
        client.stopClient();
      }

      localStorage.removeItem('matrix_session');
      setClient(null);
      setIsLoggedIn(false);
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  };

  const value: MatrixContextType = {
    client,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
  };

  return <MatrixContext.Provider value={value}>{children}</MatrixContext.Provider>;
}

export function useMatrixClient(): MatrixContextType {
  const context = useContext(MatrixContext);
  if (context === undefined) {
    throw new Error('useMatrixClient must be used within a MatrixProvider');
  }
  return context;
}
