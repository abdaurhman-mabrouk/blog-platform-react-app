import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { FetchPeopleMayKnowByUserId } from '../../../services/FriendsServices';
import FriendCard from '../FriendCard/FriendCard';

function PeopleMayKnow() {
  const { user } = useAuth();
  const [peopleMayKnow, setPeopleMayKnow] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching people for user ID:', user?.id); // Debug log

        const people = await FetchPeopleMayKnowByUserId(user?.id);
        console.log('API returned:', people); // Debug log

        setPeopleMayKnow(people || []);
      } catch (error) {
        console.error('Failed to fetch people you may know:', error);
        setPeopleMayKnow([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchPeople();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Debug current state
  useEffect(() => {
    console.log('Current peopleMayKnow state:', peopleMayKnow);
  }, [peopleMayKnow]);

  return (
    <div className="container mt-5">
      <h2>People You May Know</h2>
      <p>
        Here you can find suggestions for people you might want to connect with.
      </p>

      <div className="row">
        {isLoading ? (
          <div className="col-md-12">
            <p>Loading suggestions...</p>
          </div>
        ) : peopleMayKnow.length > 0 ? (
          peopleMayKnow.map((person) => (
            <div key={person.id}>
              <FriendCard friend={person} key={person.id} />
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <p>No suggestions available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PeopleMayKnow;
