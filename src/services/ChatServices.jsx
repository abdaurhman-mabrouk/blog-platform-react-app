const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function SendMessageService(
  chatId,
  messageText,
  sender,
  receiver
) {
  //Generate a unique message ID
  const messageId = new Date().toISOString() + Math.random().toFixed(5);

  // Fetch the current chat data
  const chatResponse = await fetch(`${API_BASE_URL}/chats/${chatId}`);
  if (!chatResponse.ok) {
    throw new Error('Failed to fetch chat');
  }
  const chat = await chatResponse.json();

  // Create the new message object
  const newMessage = {
    id: messageId,
    text: messageText,
    sender: sender,
    receiver: receiver,
    date: new Date().toISOString(),
  };

  // Add the new message to the messages array
  const updatedMessages = [...(chat.messages || []), newMessage];

  // Update the chat with the new messages array
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: updatedMessages,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to send message');
  }
}

export async function DeleteMessageService(messageId) {
  const response = await fetch(`/api/chat/messages/${messageId}`, {
    method: 'DELETE',
  });
  return response.json();
}

export async function DeleteChatByIdService(chatId) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to delete the chat by ID: ' + chatId);
  }
}

export async function EditMessageService(messageId, updatedText) {
  const response = await fetch(`/api/chat/messages/${messageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: updatedText }),
  });
  return response.json();
}

export async function FetchChatByIdService(chatId) {
  const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('Failed to fetch chat messages');
  }
}

export async function FetchAllChatsService(limit) {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    console.log(await response.json());
    return await response.json();
  } else {
    throw new Error('Failed to fetch all chats');
  }
}

export async function FetchChatsByUsernameService(username) {
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  } else {
    const chats = await response.json();
    return chats.filter((chat) => {
      return chat.users.includes(username);
    });
  }
}

export async function CreateNewChatService(users = []) {
  const chatId = new Date().toISOString() + Math.random().toFixed(5);
  const newChat = {
    id: chatId,
    users: users,
    messages: [],
    createdAt: new Date().toISOString(),
  };

  //Send Data to the server to create a new chat
  const response = await fetch(`${API_BASE_URL}/chats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newChat),
  });

  if (!response.ok) {
    throw new Error('Failed to create new chat');
  }

  return await response.json();
}
