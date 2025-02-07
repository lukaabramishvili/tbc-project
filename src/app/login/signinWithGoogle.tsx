"use client";

import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import GoogleIcon from "../../../public/google.png";
import { useLanguage } from "../context/LanguageContext";

export default function SignInWithGoogle() {
  const signInWithGoogle = async () => {

    const baseUrl = window.location.origin

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${baseUrl}/auth/callback`,
      },
    });
    
    if (error) {
      console.error("Error during sign-in:", error.message);
    } else {
      console.log("Sign-in successful:");
    }
  };

  const {language} = useLanguage()

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        signInWithGoogle();
      }}
      className="w-full flex justify-center mt-4"
    >
      <button
        type="submit"
        className="flex items-center gap-2 px-4 py-2 bg-white text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
      >
        <Image
            src={GoogleIcon.src}
            width={20}
            height={20}
            className="w-5 h-5" 
            alt={"Google logo"}        
        />
          {language === "eng" ? "Sign in with Google" : "გაიარე რეგისტრაცია Google-ით"}
        </button>
    </form>
  );
}
