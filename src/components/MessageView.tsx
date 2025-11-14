import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useMatrixClient } from '../hooks/useMatrixClient';
import { MessageItem } from '../types';
import { eventToMessageItem, getRoomName, formatTimestamp } from '../utils/matrixHelpers';
import { debounce } from '../utils/uiBatcher';
import { RoomEvent, EventType } from 'matrix-js-sdk';

interface MessageViewProps {
  roomId: string | null;
}

export function MessageView({ roomId }: MessageViewProps) {
  const { client } = useMatrixClient();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [roomName, setRoomName] = useState('');
  const messageListRef = useRef<HTMLDivElement>(null);

  // Load messages for the selected room
  const loadMessages = useMemo(
    () =>
      debounce(() => {
        if (!client || !roomId) {
          setMessages([]);
          setRoomName('');
          return;
        }

        const room = client.getRoom(roomId);
        if (!room) {
          setMessages([]);
          setRoomName('');
          return;
        }

        setRoomName(getRoomName(room));

        const timeline = room.getLiveTimeline();
        const events = timeline.getEvents();

        const messageItems: MessageItem[] = [];
        events.forEach((event) => {
          const item = eventToMessageItem(event, client);
          if (item) {
            messageItems.push(item);
          }
        });

        setMessages(messageItems);

        // Mark room as read
        const lastEvent = events[events.length - 1];
        if (lastEvent) {
          client.sendReadReceipt(lastEvent).catch((err) => {
            console.error('Error sending read receipt:', err);
          });
        }
      }, 2000), // Batch updates for E Ink
    [client, roomId]
  );

  // Listen for new messages
  useEffect(() => {
    if (!client || !roomId) return;

    const handleTimeline = (event: any, room: any) => {
      if (room?.roomId === roomId) {
        loadMessages();
      }
    };

    client.on(RoomEvent.Timeline, handleTimeline);
    loadMessages();

    return () => {
      client.removeListener(RoomEvent.Timeline, handleTimeline);
    };
  }, [client, roomId, loadMessages]);

  // Auto-scroll to bottom on new messages (with debouncing for E Ink)
  useEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }, 100);

    return () => clearTimeout(scrollTimeout);
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!client || !roomId || !messageText.trim() || isSending) return;

    setIsSending(true);

    try {
      await client.sendTextMessage(roomId, messageText.trim());
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!roomId) {
    return (
      <div className="message-view">
        <div className="empty-state">Select a conversation to start</div>
      </div>
    );
  }

  return (
    <div className="message-view">
      <div className="message-view-header">
        <div className="message-view-title">{roomName || 'Loading...'}</div>
      </div>

      <div className="message-list" ref={messageListRef}>
        {messages.length === 0 ? (
          <div className="empty-state">No messages yet</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.eventId} className="message-item">
              <div className="message-sender">{msg.senderName}</div>
              <div className="message-content">{msg.content}</div>
              <div className="message-time">{formatTimestamp(msg.timestamp)}</div>
            </div>
          ))
        )}
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <textarea
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
          disabled={isSending}
          aria-label="Message input"
        />
        <button type="submit" disabled={isSending || !messageText.trim()}>
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
