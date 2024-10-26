"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkisIsAuthenticated } from "../services/authService";

export default function authLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getAuthStatus() {
      const res = await checkisIsAuthenticated();
      setIsAuthenticated(res);
    }
    getAuthStatus();
  }, []);

  return <div>{isAuthenticated ? children : router.push("/login")}</div>;
}
