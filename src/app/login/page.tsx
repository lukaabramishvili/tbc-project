"use client";

import "./Login.css";
import { useRouter } from "next/navigation";
import { login, signup } from "./actions";

export default function Login() {
  const router = useRouter();

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
    <main className="flex items-center justify-center min-h-screen bg-gray-100 gap-6 dark:bg-gray-700">
      <form 
        onSubmit={handleLogin} 
        className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Log in</h2>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required 
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-indigo-200" 
        />
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
        <input 
          id="password" 
          name="password" 
          type="password" 
          required 
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-indigo-200" 
        />
        <button 
          type="submit" 
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600">
          Log in
        </button>
      </form>

      <form 
        onSubmit={handleSignup} 
        className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-lg font-semibold mb-4">Sign up</h2>
        <label htmlFor="email-signup" className="block mb-2 text-sm font-medium text-gray-700">Email:</label>
        <input 
          id="email-signup" 
          name="email" 
          type="email" 
          required 
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-indigo-200" 
        />
        <label htmlFor="password-signup" className="block mb-2 text-sm font-medium text-gray-700">Password:</label>
        <input 
          id="password-signup" 
          name="password" 
          type="password" 
          required 
          className="w-full p-2 border rounded-md mb-4 focus:ring focus:ring-indigo-200" 
        />
        <button 
          type="submit" 
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
          Sign up
        </button>
      </form>
    </main>
  );
}