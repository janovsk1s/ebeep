import React, { useState, useEffect, useMemo } from 'react';
import { useMatrixClient } from '../hooks/useMatrixClient';
import { ConversationItem } from '../types';
import { roomToConversationItem } from '../utils/matrixHelpers';
import { debounce } from '../utils/uiBatcher';
import { ClientEvent, RoomEvent } from 'matrix-js-sdk';

interface ConversationListProps {
  selectedRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

export function ConversationList({ selectedRoomId, onSelectRoom }: ConversationListProps) {
  const { client, logout } = useMatrixClient();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load conversations from Matrix client
  const loadConversations = useMemo(
    () =>
      debounce(() => {
        if (!client) return;

        const rooms = client.getRooms();
        const items = rooms
          .map(roomToConversationItem)
          .sort((a, b) => b.timestamp - a.timestamp);

        setConversations(items);
        setIsLoading(false);
      }, 2000), // Batch updates for E Ink
    [client]
  );

  // Initial load and sync listener
  useEffect(() => {
    if (!client) return;

    const handleSync = (state: string) => {
      if (state === 'PREPARED') {
        loadConversations();
      }
    };

    const handleRoomEvent = () => {
      loadConversations();
    };

    client.on(ClientEvent.Sync, handleSync);
    client.on(RoomEvent.Timeline, handleRoomEvent);
    client.on(RoomEvent.Receipt, handleRoomEvent);

    // Load immediately if already synced
    if (client.getSyncState() === 'SYNCING' || client.getSyncState() === 'PREPARED') {
      loadConversations();
    }

    return () => {
      client.removeListener(ClientEvent.Sync, handleSync);
      client.removeListener(RoomEvent.Timeline, handleRoomEvent);
      client.removeListener(RoomEvent.Receipt, handleRoomEvent);
    };
  }, [client, loadConversations]);

  // Filter conversations by search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) {
      return conversations;
    }

    const query = searchQuery.toLowerCase();
    return conversations.filter(
      (conv) =>
        conv.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
    );
  }, [conversations, searchQuery]);

  // Handle search input with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, roomId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRoom(roomId);
    }
  };

  if (isLoading) {
    return (
      <div className="conversation-list">
        <div className="conversation-list-header">
          <h1>EBeep</h1>
          <button onClick={logout}>Logout</button>
        </div>
        <div className="loading-container">Loading...</div>
      </div>
    );
  }

  return (
    <div className="conversation-list">
      <div className="conversation-list-header">
        <h1>EBeep</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className="conversation-list-search">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search conversations"
        />
      </div>

      <div className="conversation-list-items">
        {filteredConversations.length === 0 ? (
          <div className="empty-state">No conversations found</div>
        ) : (
          filteredConversations.map((conv) => (
            <div
              key={conv.roomId}
              className={`conversation-item ${
                selectedRoomId === conv.roomId ? 'selected' : ''
              } ${conv.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => onSelectRoom(conv.roomId)}
              onKeyDown={(e) => handleKeyDown(e, conv.roomId)}
              tabIndex={0}
              role="button"
              aria-label={`${conv.name}, ${conv.unreadCount} unread messages`}
            >
              <div className="conversation-item-name">
                {conv.name}
                {conv.unreadCount > 0 && (
                  <span className="conversation-item-unread">({conv.unreadCount})</span>
                )}
              </div>
              {conv.lastMessage && (
                <div className="conversation-item-preview">{conv.lastMessage}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
