"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "./actions";
import Image from "next/image";
import Logo from "../../../public/logo.png";
import { url } from "inspector";
import SignInWithGithub from "./signinWithGithub";
import SignInWithGoogle from "./signinWithGoogle";
import { useLanguage } from "../context/LanguageContext";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleForm = () => setIsLogin(!isLogin);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData);
    router.push("/");
    setLoading(false);
  }

  console.log(loading);
  

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signup(formData);
    router.push("/");
    setLoading(false);
  }

  if (loading) return (
    <div className="flex-col gap-4 w-full h-[80vh] flex items-center justify-center">
      <div
        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
      >
        <div
          className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
        ></div>
      </div>
    </div>
  );

  const { language } = useLanguage()

  return (
    <>
      {loading ? (
        <div className="flex-col gap-4 w-full h-[80vh] flex items-center justify-center">
          <div
            className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
          >
            <div
              className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
            ></div>
          </div>
        </div>
      ) : (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#2C2758]">
          <div className="w-full max-w-md p-6">
        {isLogin ? (
          <div>
          <form onSubmit={handleLogin}>
            <div className="bg-gray-100 dark:bg-gray-900 dark:border-[4px] border-blue-900 rounded-2xl dark:hover:border-blue-500 bg-gray-150 shadow-xl hover:shadow-2xl transition-all duration-200 p-8">
              <div className="flex flex-col items-center space-y-4 font-semibold text-gray-500">
                <Image src={Logo} alt="logo" width={200} height={200} />
                <h1 className="text-black dark:text-white text-2xl ">
                  {language === "eng" ? "Log in Job Finder" : "შედი Job Finder-ზე"}
                </h1>
                <input
                  className="w-full p-2 text-white bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder={language === "eng" ? "Email" : "იმეილი"}
                  type="email"
                  name="email"
                  id="email"
                  data-cy="email"
                />
                <input
                  className="w-full p-2 text-white bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder={language === "eng" ? "Password" : "პაროლი"}
                  type="password"
                  name="password"
                  id="password"
                  data-cy="password"
                />
                <button
                  className="cursor-pointer w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                  data-cy="login"
                >
                  {language === "eng" ? "submit" : "შესვლა"}                
                </button>
                <p className="text-black dark:text-white">
                  {language === "eng" ? "Don't have an account?" : "არ გაქვს ანგარიში?"}{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="cursor-pointer font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 rounded-xl p-1"
                  >
                    {language === "eng" ? "Sign up" : "დარეგისტრირდი"}
                  </button>
                </p>
              </div>
            </div>
          </form>

          <h3 className="flex items-center justify-center mt-4 dark:text-white text-xl">
            {language === "eng" ? "or" : "ან"}
          </h3>

          <SignInWithGithub/>

          <SignInWithGoogle/>

          </div>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="bg-gray-100 dark:bg-gray-900 dark:border-[4px] border-blue-900 rounded-2xl dark:hover:border-blue-500 bg-gray-150 shadow-xl hover:shadow-2xl transition-all duration-200 p-8">
              <div className="flex flex-col items-center space-y-4 font-semibold text-gray-500">
                <Image src={Logo} alt="logo" width={200} height={200} />
                <h1 className="text-black dark:text-white text-2xl">
                  {language === "eng" ? "Sign up Job Finder" : "დარეგისტრირდი Job Finder-ზე"}
                </h1>
                <input
                  className="w-full p-2 text-white bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder={language === "eng" ? "Email" : "იმეილი"}
                  type="email"
                  name="email"
                  id="email-signup"
                />
                <input
                  className="w-full p-2 text-white bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder={language === "eng" ? "Password" : "პაროლი"}
                  type="password"
                  name="password"
                  id="password-signup"
                />
                <button
                  className="cursor-pointer w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                  data-cy="login"
                >
                  {language === "eng" ? "Register" : "რეგისტრაცია"}                
                </button>
                <p>
                  {language === "eng" ? "Do you already have an account?" : "უკვე გაქვთ ანგარიში?"}{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="cursor-pointer font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 rounded-xl p-1"
                  >
                    {language === "eng" ? "Log in" : "ავტორიზაცია"}
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}
          </div>
        </main>
      )}
    </>
  );
}

