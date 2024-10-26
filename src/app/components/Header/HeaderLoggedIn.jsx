'use client';

import { useEffect, useState } from "react";
import { getCurrentAuthUser } from "../../services/authService";
import "./HeaderLoggedIn.css"
import { useUserDataContext } from '../../providers/UserDataProvider';

export default function HeaderLoggedIn() {
  const userData = useUserDataContext();

  function handleLogout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    window.location.href = '/login';
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="header-loggedIn">
      <span className="header-hello">{`Hello ${userData.firstName}!`} </span>
      <span className="header-logout">
        <button className="btn-logout" onClick={handleLogout}>
          Log Out
        </button>
      </span>
    </div>
  );
}
