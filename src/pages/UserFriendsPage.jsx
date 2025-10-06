import { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { FetchUserFriendsByUsername } from '../services/FriendsServices';
import PeopleMayKnow from '../components/sections/PeopleMayKnowList/PeopleMayKnow';
import FriendCard from '../components/sections/FriendCard/FriendCard';
import { FetchUsersService } from '../services/PostServices';
import UserAddRequestsList from '../components/sections/UserAddRequestsList/UserAddRequestsList';
import FriendsList from '../components/sections/FriendsList/FriendsList';

export default function UserFriendsPage({}) {
  const { user } = useAuth();
  
  return (
    <>
      {/* People You May Know Section */}
      <PeopleMayKnow />

      <FriendsList username={user.username}/>
        <UserAddRequestsList username={user.username} />
    </>
  );
}
