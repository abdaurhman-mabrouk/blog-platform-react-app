import { FetchUsersService } from './PostServices';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

export async function FetchUserFriendsByUsername(username) {
  try {
    const userRes = await fetch(
      `${API_BASE_URL}/users?username=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!userRes.ok) {
      throw new Error('Failed to fetch user');
    }

    const users = await userRes.json();
    if (!users.length) {
      throw new Error('User not found');
    }

    // friends is likely an array or undefined
    const friends = users[0].friends || [];
    return friends;
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
}

// Fetch "People You May Know" suggestions
export async function FetchPeopleMayKnowByUserId(userId) {
  try {
    // ✅ Get all users from the API
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to fetch users');

    const users = await response.json();
    if (!Array.isArray(users) || users.length === 0) return [];

    // ✅ Find the current user
    const currentUser = users.find((u) => u.id === userId);
    if (!currentUser) throw new Error('User not found');

    // ✅ Current user's lists
    const friends = currentUser.friends || [];
    const sentRequests = currentUser.sentAddRequests || [];
    const receivedRequests = currentUser.addRequests || [];

    // Convert arrays to Sets for faster O(1) lookups
    const friendsSet = new Set(friends);
    const sentToSet = new Set(sentRequests.map((r) => r.receiver));
    const receivedFromSet = new Set(receivedRequests.map((r) => r.sender));

    // ✅ Filter out users who should not appear in suggestions
    const suggestions = users.filter((user) => {
      if (user.id === userId) return false; // Exclude self
      if (friendsSet.has(user.username)) return false; // Already a friend
      if (sentToSet.has(user.username)) return false; // You already sent a request
      if (receivedFromSet.has(user.username)) return false; // They already sent you a request
      return true;
    });

    // 🔹 Optional: rank suggestions by mutual friends count
    const userFriendsSet = new Set(friends);
    const suggestionsWithMutualCount = suggestions.map((user) => {
      const mutualFriends = (user.friends || []).filter((f) =>
        userFriendsSet.has(f)
      );
      return { ...user, mutualFriendsCount: mutualFriends.length };
    });

    // Sort by number of mutual friends (descending)
    suggestionsWithMutualCount.sort(
      (a, b) => b.mutualFriendsCount - a.mutualFriendsCount
    );

    return suggestionsWithMutualCount;
  } catch (error) {
    console.error('Error fetching people you may know:', error);
    throw error;
  }
}

export async function FetchUserAddRequestsByUsername(username) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?username=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const users = await response.json();
    if (!users.length) {
      throw new Error('User not found');
    }

    // Get the user's add requests
    const userAddRequests = users[0].addRequests || [];
    return userAddRequests;
  } catch (error) {
    console.error('Error fetching add requests:', error);
    throw error;
  } finally {
  }
}

//Fetch Sent Add Requests By Username
export async function FetchUserSentAddRequestsByUsername(username) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users?username=${encodeURIComponent(username)}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const users = await response.json();
    if (!users.length) {
      throw new Error('User not found');
    }

    // Get the user's add requests
    const userSentAddRequests = users[0].sentAddRequests || [];
    return userSentAddRequests;
  } catch (error) {
    console.error('Error fetching add requests:', error);
    throw error;
  } finally {
  }
}

//Send Friend Request Service
export async function SendFriendRequest(userId, username, friendUsername) {
  try {
    // Fetch current user
    const currentRes = await fetch(`${API_BASE_URL}/users/${userId}`);
    if (!currentRes.ok) throw new Error('Failed to fetch your profile.');
    const currentUser = await currentRes.json();

    if (!currentUser) throw new Error('Your profile was not found!');

    // Fetch target friend by username
    const targetRes = await fetch(
      `${API_BASE_URL}/users?username=${encodeURIComponent(friendUsername)}`
    );
    if (!targetRes.ok) throw new Error('Failed to fetch target user.');
    const targetUsers = await targetRes.json();
    const targetFriend = targetUsers[0];
    if (!targetFriend) throw new Error('The profile was not found!');

    if (username === friendUsername) {
      throw new Error('You cannot send a friend request to yourself!');
    }

    const friendAddRequests = Array.isArray(targetFriend.addRequests)
      ? targetFriend.addRequests
      : [];

    if (friendAddRequests.some((req) => req.sender === username)) {
      throw new Error(`You already sent a friend request to ${friendUsername}`);
    }

    const friendFriends = Array.isArray(targetFriend.friends)
      ? targetFriend.friends
      : [];
    if (friendFriends.includes(username)) {
      throw new Error('You are already friends with this user!');
    }

    const requestId =
      crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 15);
    const newFriendRequest = {
      id: requestId,
      sender: username,
      receiver: friendUsername,
      date: new Date().toISOString(),
    };

    const updatedAddRequests = [...friendAddRequests, newFriendRequest];
    const oldSentRequests = Array.isArray(currentUser.sentAddRequests)
      ? currentUser.sentAddRequests
      : [];
    const updatedSentRequests = [...oldSentRequests, newFriendRequest];

    const [targetUpdate, senderUpdate] = await Promise.all([
      fetch(`${API_BASE_URL}/users/${targetFriend.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addRequests: updatedAddRequests }),
      }),
      fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentAddRequests: updatedSentRequests }),
      }),
    ]);

    if (!targetUpdate.ok || !senderUpdate.ok) {
      throw new Error('Failed to send friend request completely.');
    }

    return true;
  } catch (error) {
    console.error('Error sending friend request:', error);
    throw error;
  }
}

//unFriendUserByUserName Service
export async function UnfriendUserByUsername(userId, username, friendUsername) {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    if (users.length > 0) {
      // Find the current user by userId
      const currentUser = users.find((user) => user.id === userId);

      if (!currentUser) {
        throw new Error('Your Profile Not Found!');
      }

      // Get current user's friends (array of usernames)
      const userFriends = currentUser.friends || [];

      // check if friendUsername exists in userFriends
      if (userFriends.includes(friendUsername)) {
        // Remove Friend Username from User Friends List Locally and store them in variable
        var updatedFriends = userFriends.filter(
          (friend) => friend !== friendUsername
        );

        // Update Current User's Friends List in The Database
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ friends: updatedFriends }),
        });

        if (!response.ok) {
          throw new Error('Failed to update friends list!');
        }
      } else {
        throw new Error('This is not in Your Friends List!');
      }

      return updatedFriends;
    }

    return []; // Return empty array if no users exist
  } catch (error) {
    console.error('Error fetching people you may know:', error);
    throw error;
  }
}

//Accept Friend Request Service
export async function AcceptFriendRequest(
  requestId,
  requestSender,
  requestReceiver
) {
  try {
    // Add validation before the API call
    if (!requestReceiver) {
      throw new Error('Invalid request receiver username');
    }

    // Fetch all users
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    // Find the receiver (current user) and sender
    const receiverUser = users.find(
      (user) => user.username === requestReceiver
    );

    const senderUser = users.find((user) => user.username === requestSender);

    if (!receiverUser) {
      throw new Error('Your profile was not found!');
    }

    if (!senderUser) {
      throw new Error('The sender profile was not found!');
    }

    // Check if the request exists in receiver's addRequests
    const receiverAddRequests = receiverUser.addRequests || [];
    const requestExists = receiverAddRequests.some(
      (req) => req.id === requestId && req.sender === requestSender
    );
    if (!requestExists) {
      throw new Error('Friend request not found!');
    }

    // Update friends lists if not already friends
    const receiverFriends = receiverUser.friends || [];
    const senderFriends = senderUser.friends || [];

    let updatedReceiverFriends = receiverFriends.includes(requestSender)
      ? receiverFriends
      : [...receiverFriends, requestSender];

    let updatedSenderFriends = senderFriends.includes(requestReceiver)
      ? senderFriends
      : [...senderFriends, requestReceiver];

    // Remove the request from receiver's addRequests
    const updatedAddRequests = receiverAddRequests.filter(
      (req) => req.id !== requestId
    );

    // Update receiver's friends and addRequests
    const receiverPatch = fetch(`${API_BASE_URL}/users/${receiverUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friends: updatedReceiverFriends,
        addRequests: updatedAddRequests,
      }),
    });

    // Update sender's friends
    const senderPatch = fetch(`${API_BASE_URL}/users/${senderUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        friends: updatedSenderFriends,
      }),
    });

    const [receiverRes, senderRes] = await Promise.all([
      receiverPatch,
      senderPatch,
    ]);

    if (!receiverRes.ok) {
      throw new Error('Failed to update your friends/add requests!');
    }
    if (!senderRes.ok) {
      throw new Error("Failed to update sender's friends list!");
    }

    return true;
  } catch (error) {
    console.error('Error accepting friend request:', error);
    throw error;
  }
}

//Decline Friend Request Service
export async function DenclineFriendRequest(
  requestId,
  requestSender,
  requestReceiver
) {
  try {
    // Add validation before the API call
    if (!requestSender) {
      throw new Error('Invalid request sender username');
    } else if (!requestReceiver) {
      throw new Error('Invalid request receiver username');
    } else if (!requestId) {
      throw new Error('Invalid request id');
    }

    // Fetch all users
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const users = await response.json();

    // find the receiver (current user)
    const receiverUser = users.find(
      (user) => user.username === requestReceiver
    );

    if (!receiverUser) {
      throw new Error('Your Profile Not Found!');
    }

    //Check if the request exist in receiver's addRequests
    const receiverAddRequests = receiverUser.addRequests || [];
    const requestExists = receiverAddRequests.some(
      (req) => req.id === requestId && req.sender === requestSender
    );
    if (!requestExists) {
      throw new Error('Friend request not found!');
    }
    // Remove the request from receiver's addRequests
    const updatedAddRequests = receiverAddRequests.filter(
      (req) => req.id !== requestId
    );
    // Update receiver's addRequests
    const receiverPatch = await fetch(
      `${API_BASE_URL}/users/${receiverUser.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addRequests: updatedAddRequests,
        }),
      }
    );
    if (!receiverPatch.ok) {
      throw new Error('Failed to update your add requests!');
    }
    return true;
  } catch (error) {
    console.error('Error declining friend request:', error);
    throw error;
  } finally {
  }
}

//Cancel Sent Friend Request Service
export async function CancelFriendSentRequest(requestId) {
  try {
    // Add Validation Before the API Call
    if (!requestId) {
      throw new Error('Invalid request id');
    }

    FetchUsersService().then((users) => {
      if (users.length > 0) {
        users.forEach((user) => {
          const sentAddRequests = user.sentAddRequests || [];
          const updatedSentRequests = sentAddRequests.filter(
            (request) => request.id !== requestId
          );
          // Update User's Sent Add Requests in The Database
          fetch(`${API_BASE_URL}/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentAddRequests: updatedSentRequests }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Failed to update sent friend requests');
            }
            return true;
          });

          // Update the Friend addRequests in The Database
          const addRequests = user.addRequests || [];
          const updatedAddRequests = addRequests.filter(
            (request) => request.id !== requestId
          );

          fetch(`${API_BASE_URL}/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ addRequests: updatedAddRequests }),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Failed to update sent friend requests');
            }
            return true;
          });
        });
      }
    });
  } catch (error) {
  } finally {
  }
}
