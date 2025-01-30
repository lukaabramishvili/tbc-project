'use client';

import React, { useState } from 'react'
import ShowPassword from "../../../public/profile/show.png";
import HidePassword from "../../../public/profile/hide.png";
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';

interface User {
  email: string;
}


export default function updatePasswordPage() {

  const [showPassword, setShowPassword] = useState(false);
const [user, setUser] = useState<User | null>(null);
const [email, setEmail] = useState("");

function updatePassword() {
  async function fetchUser() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return;
    }

    return data.user as User;
  }

  fetchUser();
}

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
    .updateUser({
      email: validateEmail,
      password: (document.getElementById("password") as HTMLInputElement)?.value
    });

    if (data){
      alert("Password recovery email sent check your inbox");
    }
  } catch (error) {
    alert("Error sending password recovery email");
  }
}


return (
  <div className="flex justify-center items-center min-h-screen bg-white dark:bg-[#2C2758] text-black dark:text-white">
    <div className="w-full max-w-sm p-6 bg-gray-100 dark:bg-[#374151] shadow-md rounded-lg">
      {/* <input 
        type="email" 
        value={user?.email}
        readOnly 
        className="border px-4 py-2 rounded cursor-not-allowed w-full mb-4 bg-gray-200 dark:bg-[#2C2758] text-black dark:text-white border-gray-500"
      /> */}
      
      <div className="relative w-full mb-4">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Your new password"
          className="border px-4 py-2 rounded w-full pr-12 bg-gray-200 dark:bg-[#2C2758] text-black dark:text-white border-gray-500"
          onClick={(e) => e.currentTarget.select()}
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-2 px-4 py-2"
        >
          {showPassword ?
            <Image src={ShowPassword} alt="Show password" width={20} height={20} /> :
            <Image src={HidePassword} alt="Hide password" width={20} height={20} />
          }
        </button>
      </div>
      
      <button 
        className="w-full rounded-lg px-6 py-2 cursor-pointer text-black dark:text-white bg-gray-300 dark:bg-[#2C2758] hover:bg-gray-400 dark:hover:bg-[#374151] duration-300"
        onClick={recoverPassword}
      >
        Change Password
      </button>
    </div>
  </div>
)}
