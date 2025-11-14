import { Room, MatrixEvent, MatrixClient, EventType } from 'matrix-js-sdk';
import { ConversationItem, MessageItem } from '../types';

/**
 * Get display name for a room
 */
export function getRoomName(room: Room): string {
  const name = room.name;
  if (name) return name;

  // For DMs, use the other user's name
  const members = room.getJoinedMembers();
  if (members.length === 2) {
    const otherMember = members.find(m => m.userId !== room.client.getUserId());
    if (otherMember) {
      return otherMember.name || otherMember.userId;
    }
  }

  // Fallback to room ID
  return room.roomId;
}

/**
 * Get the last message text from a room
 */
export function getLastMessageText(room: Room): string {
  const timeline = room.getLiveTimeline();
  const events = timeline.getEvents();

  // Search backwards for the last text message
  for (let i = events.length - 1; i >= 0; i--) {
    const event = events[i];
    if (event.getType() === EventType.RoomMessage) {
      const content = event.getContent();
      if (content.msgtype === 'm.text') {
        return content.body || '';
      }
    }
  }

  return '';
}

/**
 * Convert a Matrix room to a ConversationItem
 */
export function roomToConversationItem(room: Room): ConversationItem {
  const lastMessage = getLastMessageText(room);
  const lastEvent = room.getLastActiveTimestamp();
  const unreadCount = room.getUnreadNotificationCount('total') || 0;

  return {
    roomId: room.roomId,
    name: getRoomName(room),
    lastMessage,
    timestamp: lastEvent,
    unreadCount,
  };
}

/**
 * Get sender display name from event
 */
export function getSenderName(event: MatrixEvent, client: MatrixClient): string {
  const sender = event.getSender();
  if (!sender) return 'Unknown';

  const room = client.getRoom(event.getRoomId() || '');
  if (room) {
    const member = room.getMember(sender);
    if (member) {
      return member.name || sender;
    }
  }

  return sender;
}

/**
 * Convert a Matrix event to a MessageItem
 */
export function eventToMessageItem(event: MatrixEvent, client: MatrixClient): MessageItem | null {
  if (event.getType() !== EventType.RoomMessage) {
    return null;
  }

  const content = event.getContent();
  if (content.msgtype !== 'm.text') {
    return null; // Only text messages for E Ink
  }

  return {
    eventId: event.getId() || '',
    sender: event.getSender() || 'unknown',
    senderName: getSenderName(event, client),
    content: content.body || '',
    timestamp: event.getTs() || Date.now(),
  };
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}
