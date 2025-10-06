import React, { useState, useEffect } from 'react';
import { FetchUserFriendsByUsername } from '../../../services/FriendsServices';
import FriendCard from '../FriendCard/FriendCard';

function FriendsList({ username }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    FetchUserFriendsByUsername(username).then((friends) => {
      setFriends(friends);
    });
  }, [username]);

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4">Your Friends ({ friends.length})</h1>
        <p className="lead">Here you can see your friends and their details.</p>

        {friends.length > 0 ? (
          friends.map((friend, key) => {
            return <FriendCard key={key} friend={friend} />;
          })
        ) : (
          // Placeholder for Friends List Component
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">You Have No Friends Yet.</h5>
              <p className="card-text"></p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FriendsList;
