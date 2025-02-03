"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { logout } from "../logout/actions";
import Image from "next/image";
import Link from "next/link";

interface User {
  email: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function fetchUser() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setUser(data.user as User);
    }

    fetchUser();
  }, []);

  const validateEmail = user?.email || "";

  const recoverPassword = async () => {
    if (validateEmail !== email) {
      alert("Email does not match the current user email");
      return
    }
    try {
      const supabase = createClient();
      let {data, error} = await supabase
      .auth
      .resetPasswordForEmail(validateEmail as string);

      if (data){
        alert("Password recovery email sent check your inbox");
      }
    } catch (error) {
      alert("Error sending password recovery email");
    }
  }

  return (
    <section className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8 bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white">
      <h1 className="text-3xl font-extrabold text-[#2C2758] dark:text-[#a9a9ff]">
        Profile
      </h1>
      
      <div className="flex items-center gap-6 justify-center">
        <Image src="/profile-icon.png" alt="user" width={50} height={50} className="rounded-full border-2 border-[#2C2758] dark:border-[#a9a9ff]" />
      </div>
  
      <div className="flex flex-col items-center gap-6">
        <input 
          type="email" 
          placeholder={user?.email || "Loading..."} 
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full max-w-xs bg-gray-100 dark:bg-[#2C2758] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2C2758] dark:focus:ring-[#a9a9ff] transition-all"
        />
        <button 
          className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#2C2758] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105"
          onClick={recoverPassword}
        >
          Change Password
        </button>
      </div>
  
      <div className="flex gap-6 justify-center mt-6">
        <Link href="/orders">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#2C2758] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105">
            Orders
          </button>
        </Link>
        <Link href="/yourCourses">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#2C2758] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105">
            Your Courses
          </button>
        </Link>
        <form action={logout}>
          <button
            data-cy="logout"
            type="submit"
            className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#e74c3c] hover:bg-[#c0392b] duration-300 transition-all shadow-md hover:scale-105"
          >
            Logout
          </button>
        </form>
      </div>
    </section>
  );
  }
