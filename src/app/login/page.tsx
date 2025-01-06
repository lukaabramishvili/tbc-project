"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "./actions";
import Image from "next/image";
import Logo from "../../../public/logo.png";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await login(formData);
    router.push("/");
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await signup(formData);
    router.push("/");
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-700">
      <div className="w-full max-w-md p-6"> {/* Container with fixed max width */}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 p-8">
              <div className="flex flex-col items-center space-y-4 font-semibold text-gray-500">
                <Image src={Logo} alt="logo" width={200} height={200} />
                <h1 className="text-white text-2xl">Log in Job Finder</h1>
                <input
                  className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email"
                />
                <input
                  className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                />
                <input
                  className="cursor-pointer w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                />
                <p>
                  Do you already have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="cursor-pointer font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 rounded-xl p-1"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 p-8">
              <div className="flex flex-col items-center space-y-4 font-semibold text-gray-500">
                <Image src={Logo} alt="logo" width={200} height={200} />
                <h1 className="text-white text-2xl">Sign up Job Finder</h1>
                <input
                  className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="email-signup"
                />
                <input
                  className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password-signup"
                />
                <input
                  className="cursor-pointer w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                  type="submit"
                />
                <p>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="cursor-pointer font-semibold text-gray-500 hover:text-blue-500 transition-all duration-200 rounded-xl p-1"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
