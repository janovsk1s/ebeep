import React, { useState } from 'react';
import { useMatrixClient } from './hooks/useMatrixClient';
import { Login } from './components/Login';
import { ConversationList } from './components/ConversationList';
import { MessageView } from './components/MessageView';

function App() {
  const { isLoggedIn, isLoading } = useMatrixClient();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="loading-container">
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <ConversationList
        selectedRoomId={selectedRoomId}
        onSelectRoom={setSelectedRoomId}
      />
      <MessageView roomId={selectedRoomId} />
    </div>
  );
}

export default App;
