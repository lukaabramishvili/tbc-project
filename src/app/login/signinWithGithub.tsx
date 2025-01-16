"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import githubIcon from "../../../public/github.png";

const appUrl = process.env.BASE_URL;

export default function SignInWithGithub() {
  const signInWithGithub = async () => {
    const appUrl = process.env.BASE_URL;
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
    if (error) {
      console.error("Error during sign-in:", error.message);
    } else {
      console.log("Sign-in successful:");
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signInWithGithub();
      }}
      className="w-full flex justify-center mt-4"
    >
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <Image
            src={githubIcon.src}
            width={20}
            height={20}
            className="w-5 h-5" 
            alt={"github logo"}        
        />
        Sign in with GitHub
      </button>
    </form>
  );
}
