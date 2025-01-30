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
    <section className="flex flex-col gap-8 min-h-full items-center justify-center text-center max-w-[136rem] mx-auto p-8">
      <h1 className="text-3xl">Profile</h1>
      <div className="flex items-center gap-6 justify-center">
        <Image src="/profile-icon.png" alt="user" width={50} height={50} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <input 
          type="email" 
          placeholder={user?.email || "Loading..."} 
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded w-full max-w-xs"
        />
        <button 
          className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300"
          onClick={recoverPassword}
        >
          change password
        </button>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/orders">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300">
            Orders
          </button>
        </Link>
        <form action={logout}>
          <button
            data-cy="logout"
            type="submit"
            className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300"
          >
            Logout
          </button>
        </form>
      </div>
    </section>
  );
}
