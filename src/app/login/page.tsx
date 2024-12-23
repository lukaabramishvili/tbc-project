"use client";

import "./Login.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login, signup } from "./actions";

export default function Login() {
  const router = useRouter();

  return (
    <main>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
    </main>
  );
}
