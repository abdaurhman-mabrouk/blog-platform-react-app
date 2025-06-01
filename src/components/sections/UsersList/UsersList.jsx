import React, { useState, useEffect } from 'react';
import { FetchUsersService } from '../../../services/PostServices';

function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await FetchUsersService();
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
      <div className="users-list">
        <h2 className="users-list-title">Users List</h2>
        <div className="users-list-container">
          {users.length > 0
            ? users.map((user, key) => {
                return (
                  <div className="user-card" key={key} id={'user_' + user.id}>
                    <div className="user-card-header">
                      <h3 className="user-card-name">{user.name}</h3>
                      <p className="user-card-email">{user.email}</p>
                    </div>
                  </div>
                );
              })
            : ''}
        </div>
      </div>
    </>
  );
}

export default UsersList;
