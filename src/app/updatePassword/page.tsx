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
    <div>
        <input 
          type="email" 
          value={user?.email}
          readOnly 
          className="border px-4 py-2 rounded cursor-not-allowed w-full max-w-xs"
        />
        
        <div className="relative w-full max-w-xs">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="your password"
            className="border px-4 py-2 rounded w-full pr-12"
            onClick={(e) => e.currentTarget.select()}
          />
          <button
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 px-4 py-2 rounded"
          >
            {showPassword ?
              <Image src={ShowPassword} alt="Show password" width={20} height={20} /> :
              <Image src={HidePassword} alt="Hide password" width={20} height={20} />
            }
          </button>
          <button 
            className="rounded-lg px-6 py-2 cursor-pointer text-white bg-slate-700 hover:bg-slate-600 duration-300"
            onClick={recoverPassword}
          >
            change password
          </button>

        </div>
    </div>
  )
}
