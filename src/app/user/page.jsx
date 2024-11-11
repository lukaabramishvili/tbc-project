import { getSession } from "@auth0/nextjs-auth0";
import ProfileClient from "./components/user-client";
import ProfileServer from "./components/user-server";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";


export default async function User() {

    const session = await getSession();
    const user = session?.user

    if (!user) {
        <a href="/api/auth/login">Login</a>
    }
  return (
    <div>
        <div className="text-red-700">
            <ProfileClient/>    
        </div>
        <div className="text-blue-700">
            <ProfileServer/>
        </div>
        <a href="/api/auth/login">Login</a>
        <br/>
        <a href="/api/auth/logout">Logout</a>
    </div>
  )
}
