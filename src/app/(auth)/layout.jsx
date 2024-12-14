"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkIsAuthenticated } from "../services/authService";

export default function AuthLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    async function getAuthStatus() {
      const authenticated = await checkIsAuthenticated();
      setIsAuthenticated(authenticated);
      if (!authenticated) {
        router.push("/login");
      }
    }
    getAuthStatus();
  }, [router]);

  return <div>{isAuthenticated ? children : null}</div>;
}
