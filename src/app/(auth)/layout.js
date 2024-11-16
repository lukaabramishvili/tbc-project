"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkisIsAuthenticated } from "../services/authService";
import { getSession } from "next-auth/react";

export default function authLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getAuthStatus() {
      const session = await getSession();
      const user = session?.user
  
      if (user) {
        setIsAuthenticated(true);
      }
    }
    getAuthStatus();
  }, []);

  

  return <div>{isAuthenticated ? children : router.push("/login")}</div>;
}
