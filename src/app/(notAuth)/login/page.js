"use client";

import "./Login.css";
import { authUser, getCookie } from "../../services/authService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Username from '../../../../public/user.png';
import Password from '../../../../public/password.png';


export default function login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCredsCorrect, setIsCredCorrect] = useState(true);
  const [isAuthenticated, SetIsAuthenticated] = useState(getCookie('token'));
  async function sendAuthentication(e) {
    e.preventDefault();

    const response = await authUser(username, password);

    if (response) {
      window.location.href = '/';
      setIsCredCorrect(true);
    } else {
      setIsCredCorrect(false);
    }
  }

  return (
    <main>
      <div className="login">
        {!isAuthenticated ? (
          <>
            <form className="login-form" onSubmit={sendAuthentication}>
            <h1>Please Authenticate To Access Resources.</h1>
              <div className="username">
                <label htmlFor="username">
                  <img src={Username.src}/>
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="password">
                <label htmlFor="password">
                  <img src={Password.src}/>
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn-login">
                Login
              </button>
              {!isCredsCorrect && (
                <p className="login-incorrect">
                  Username Or Passowrd Is Incorrect!
                </p>
              )}
            </form>
          </>
        ) : (
          <h1 className="login-authenticated">
            You Are Already Authenticated.
          </h1>
        )}
      </div>
    </main>
  );
}
