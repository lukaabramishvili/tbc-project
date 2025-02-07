"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../utils/supabase/client";
import { logout } from "../logout/actions";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

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

  const {language} = useLanguage()

  return (
    <section className="flex flex-col gap-8 min-h-screen items-center justify-center text-center max-w-[136rem] mx-auto p-8 bg-white dark:bg-[#2C2758] text-gray-900 dark:text-white">
      <h1 className="text-3xl font-extrabold text-[#2C2758] dark:text-[#a9a9ff]">
        {language === "eng" ? "Profile" : "პროფილი"}
      </h1>
      
      <div className="flex items-center gap-6 justify-center">
        <Image src="/profile-icon.png" alt="user" width={50} height={50} className="rounded-full border-2 border-[#2C2758] dark:border-[#a9a9ff]" />
      </div>
  
      <div className="flex flex-col items-center gap-6">
        <input 
          type="email" 
          placeholder={user?.email || language === "eng" ? "Loading..." : "იტვირთება..."} 
          onChange={(e) => setEmail(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full max-w-xs bg-gray-100 dark:bg-[#2C2758] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2C2758] dark:focus:ring-[#a9a9ff] transition-all"
        />
        <button 
          className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#2C2758] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105"
          onClick={recoverPassword}
        >
          {language === "eng" ? "Change Password" : "პაროლის შეცვლა"}
        </button>
      </div>
  
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-6 w-full max-w-3xl">
        <Link href="/orders">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#7F73EB] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105">
            {language === "eng" ? "Orders" : "შეკვეთები"}
          </button>
        </Link>
        <Link href="/yourCourses">
          <button className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#7F73EB] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105">
            {language === "eng" ? "Your Courses" : "შენი კურსები"}
          </button>
        </Link>
        <Link 
          href={"/profile/ticTacToe"}
          className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#7F73EB] hover:bg-[#3e2784] duration-300 transition-all shadow-md hover:scale-105"
        >
          {language === "eng" ? "TicTacToe" : "იქსიკ ნოლიკი"}
        </Link>
  
        <form action={logout}>
          <button
            data-cy="logout"
            type="submit"
            className="rounded-lg px-6 py-2 cursor-pointer text-white bg-[#e74c3c] hover:bg-[#c0392b] duration-300 transition-all shadow-md hover:scale-105"
          >
            {language === "eng" ? "Logout" : "გასვლა"}
          </button>
        </form>
      </div>
    </section>
  );
    }
