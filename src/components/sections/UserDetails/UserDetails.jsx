import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function UserDetails() {
  return (
    <>
      <div className="user-details-container">User Details</div>
    </>
  );
}

export default UserDetails;
