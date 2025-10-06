import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          {/*Navbar Main Logo: Book Svg*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-book-half"
            viewBox="0 0 16 16">
            <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
          </svg>{' '}
          Blog Platform
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">
              {/* Home Svg */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16">
                <path
                  d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646
                6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5
                0 0 0-.5.5v1.293z"
                />
                <path
                  d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5
                1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"
                />
              </svg>
              Home
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/new_post">
                  {/* New Post Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5
                    0 0 1 0 1h-3v3a.5.5 0 0 1-1
                    0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5
                    0 0 1 8 4"
                    />
                  </svg>
                  New Post
                </Link>
              </li>

              <li>
                <Link to="/feed">
                  {/* Feed Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      d="M2 0a2 2 0 0 0-2
                    2v12a2 2 0 0 0 2 2h12a2 2
                    0 0 0 2-2V2a2 2 0 0 0-2-2zm1.5
                    2.5c5.523 0 10 4.477 10 10a1 1
                    0 1 1-2 0 8 8 0 0 0-8-8
                    1 1 0 0 1 0-2m0 4a6 6 0 0 1
                    6 6 1 1 0 1 1-2 0 4 4 0 0
                    0-4-4 1 1 0 0 1 0-2m.5
                    7a1.5 1.5 0 1 1 0-3 1.5
                    1.5 0 0 1 0 3"
                    />
                  </svg>
                  Feed
                </Link>
              </li>

              <li>
                <Link to="/friends">
                  {/* Friends Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      d="M7 14s-1 0-1-1 1-4 
                    5-4 5 3 5 4-1 1-1 1zm4-6a3 
                    3 0 1 0 0-6 3 3 0 0 
                    0 0 6m-5.784 6A2.24 2.24 0 
                    0 1 5 13c0-1.355.68-2.75 
                    1.936-3.72A6.3 6.3 0 0 0 
                    5 9c-4 0-5 3-5 4s1 1 1 
                    1zM4.5 8a2.5 2.5 0 1 
                    0 0-5 2.5 2.5 0 0 0 
                    0 5"
                    />
                  </svg>
                  Friends
                </Link>
              </li>

              <li>
                <Link to="/profile">
                  {/* Profile Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      d="M11 6a3 3 0 1 1-6 0 
                    3 3 0 0 1 6 0"
                    />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 
                      0A8 8 0 0 1 0 8m8-7a7 
                      7 0 0 0-5.468 
                      11.37C3.242 11.226 4.805 
                      10 8 10s4.757 1.225 5.468 
                      2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  Profile
                </Link>
              </li>

              <li>
                <Link to="/dashboard">
                  {/* Dashboard Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="bi bi-ui-checks-grid"
                    viewBox="0 0 16 16">
                    <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1m9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1m0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0z" />
                  </svg>
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/edit_profile">
                  {/* Edit Profile Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                  Edit Profile
                </Link>
              </li>

              <li>
                <Link to="/about">
                  {/* About Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                  </svg>
                  About
                </Link>
              </li>

              <li className="navbar-hello">Hello, {user.username}</li>

              <li>
                <button className="logout-btn" onClick={logout}>
                  {/* Logout Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 
                      0 0 0 0-.708l-3-3a.5.5 
                      0 0 0-.708.708L14.293 
                      7.5H5.5a.5.5 0 0 0 0 
                      1h8.793l-2.147 2.146a.5.5 
                      0 0 0 .708.708z"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  {/* Login Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M4.146 8.354a.5.5 0 
                      0 1 0-.708l3-3a.5.5 
                      0 1 1 .708.708L5.707 
                      7.5H14.5a.5.5 0 0 
                      1 0 1H5.707l2.147 
                      2.146a.5.5 0 0 
                      1-.708.708z"
                    />
                  </svg>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register">
                  {/* Register Svg */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      d="M16 8A8 8 0 1 1 
                    0 8a8 8 0 0 1 16 
                    0M8.5 4.5a.5.5 0 
                    0 0-1 0v3h-3a.5.5 
                    0 0 0 0 1h3v3a.5.5 
                    0 0 0 1 0v-3h3a.5.5 
                    0 0 0 0-1h-3z"
                    />
                  </svg>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
