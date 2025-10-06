import { useState, useEffect } from 'react';
import {
  CreateNewChatService,
  DeleteChatByIdService,
  FetchChatByIdService,
  FetchChatsByUsernameService,
  SendMessageService,
} from '../../../services/ChatServices';
import { useAuth } from '../../../auth/AuthContext';
import './ChatWindow.css'; // external CSS

export default function ChatWindow() {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState('');
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  // Fetch chats
  useEffect(() => {
    if (!user?.username) return;
    async function fetchUserChats() {
      try {
        const userChats = await FetchChatsByUsernameService(user.username);
        setChats(userChats);
        setError('');
      } catch {
        setError('Error fetching chats');
      }
    }
    fetchUserChats();
  }, [user]);

  // Fetch messages when chatId changes
  useEffect(() => {
    if (!chatId) {
      setMessages([]);
      setReceiver('');
      return;
    }
    async function fetchMessages() {
      try {
        const chat = await FetchChatByIdService(chatId);
        setMessages(chat.messages || []);
        if (Array.isArray(chat.users)) {
          const other = chat.users.find((p) => p !== user.username);
          setReceiver(other || '');
        }
      } catch {
        setMessages([]);
        setReceiver('');
        setError('Error fetching messages');
      }
    }
    fetchMessages();
  }, [chatId, user?.username]);

  // Send message
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    if (!chatId || !receiver) return;

    try {
      const newMsg = await SendMessageService(
        chatId,
        inputMessage,
        user?.username,
        receiver
      );
      setMessages((prev) => [
        ...prev,
        {
          id: newMsg?.id || Date.now(),
          text: inputMessage,
          sender: user?.username,
          receiver,
          date: new Date().toISOString(),
        },
      ]);
      setInputMessage('');
    } catch {
      alert('Failed to send message.');
    }
  };

  return isVisible ? (
    <div className="chat-window">
      {/* Header */}
      <div className="chat-header">
        <button
          className="chat-close-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Close chat">
          ✕
        </button>
        <h5>Chat Room</h5>
        <span className="chat-welcome">
          Welcome, {user?.username || 'Guest'}!
        </span>
      </div>

      {/* Chats list */}
      <div className="chat-list">
        {chats.length > 0 ? (
          chats.map((chat) => {
            const otherUsers = (chat.users || []).filter(
              (p) => p !== user.username
            );
            return (
              <div
                key={chat.id}
                className={`chat-item ${chatId === chat.id ? 'active' : ''}`}
                onClick={() => setChatId(chat.id)}>
                <span className="chat-user">
                  {otherUsers.join(', ') || 'Unknown'}
                </span>
                <span className="chat-date">
                  {new Date(chat.createdAt).toDateString()}
                </span>
                <button
                  className="chat-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    DeleteChatByIdService(chat.id);
                  }}
                  aria-label="Delete chat">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 16 16">
                    <path
                      fill="red"
                      d="M2.5 1a1 1 0 0 0-1 1v1h13V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zM3 4v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4H3z"
                    />
                  </svg>
                </button>
              </div>
            );
          })
        ) : error ? (
          <div className="chat-error">{error}</div>
        ) : (
          <div className="chat-empty">No chats found.</div>
        )}
        <button
          className="chat-new-btn"
          onClick={() =>
            CreateNewChatService([
              user.username,
              window.prompt('Enter username:') || '',
            ])
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="white"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14" />
            <path d="M8 4v8M4 8h8" />
          </svg>
          New Chat
        </button>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {chatId && messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message ${
                msg.sender === user.username ? 'sent' : 'received'
              }`}>
              <span className="chat-bubble">{msg.text}</span>
              <small className="chat-meta">
                {msg.sender} - {new Date(msg.date).toLocaleTimeString()}
              </small>
            </div>
          ))
        ) : chatId ? (
          <div className="chat-empty">No messages yet.</div>
        ) : (
          <div className="chat-empty">Select a chat to view messages.</div>
        )}
      </div>

      {/* Input */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={async (e) => e.key === 'Enter' && handleSendMessage()}
          disabled={!chatId}
        />
        <button onClick={handleSendMessage} disabled={!chatId}>
          Send
        </button>
      </div>
    </div>
  ) : (
    <div className="chat-toggle" onClick={() => setIsVisible(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 16 16">
        <path
          fill="#0d6efd"
          d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.4a1 1 0 0 0-.7.3L.9 15.1A.5.5 0 0 1 0 14.8zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        />
      </svg>
    </div>
  );
}
