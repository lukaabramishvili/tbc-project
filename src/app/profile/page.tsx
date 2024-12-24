"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../../public/loading.png";

interface User {
  name: string;
  nickname: string;
  email: string;
  picture: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const userData: User = await response.json();
          setUser(userData);
        } else {
          console.warn("Failed to fetch user data");
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <main
        id="prof"
        className="flex items-center justify-center gap-y-7 my-40"
      >
        <div className="border-4 border-gray-800 border-t-[#BAB9B9] rounded-full animate-spin flex justify-center items-center">
          <Image
            src={Loading.src}
            width={100}
            height={100}
            alt="Loading spinner"
            className="w-16 h-16"
          />
        </div>
        <h1 className="text-2xl text-gray-700">Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex flex-col items-center justify-center gap-y-6 my-40">
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
          <p className="text-center text-red-500 font-semibold">
            User not found or not authenticated.
          </p>
        </div>
        <Link href="/api/auth/login">
          <button className="cursor-pointer border-none bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-800 hover:shadow-lg transition duration-200">
            Log In
          </button>
        </Link>
      </main>
    );
  }

  return (
    <main id="profile-page" className="p-12">
      <div className="prof-header-cont flex items-center justify-center mb-12">
        <div className="profile-header flex items-center justify-center gap-3 bg-gray-50 w-fit px-6 py-4 rounded-lg shadow-md">
          {user.picture && (
            <img
              src={user.picture}
              alt="User Profile Avatar"
              width={72}
              height={72}
              className="rounded-full border-2 border-gray-300"
            />
          )}
          <div className="header-text flex items-center flex-col text-gray-800">
            <p className="F-name text-4xl font-bold">
              {user.name || "No Name Available"}
            </p>
            <p className="L-name text-2xl font-medium text-gray-600">
              {user.nickname || ""}
            </p>
          </div>
        </div>
      </div>
      <div className="grid-cont grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center mb-12">
        <div className="grid-item flex items-center justify-center flex-col gap-3 bg-gray-50 w-fit px-6 py-4 rounded-lg shadow-md">
          <h6 className="font-bold text-gray-700">Email</h6>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="contacts grid-item flex items-center justify-center flex-col gap-3 bg-gray-50 w-fit px-6 py-4 rounded-lg shadow-md">
          <h6 className="font-bold text-gray-700">Contact Info</h6>
          <p className="mail flex gap-1 text-gray-600">
            <span>Email:</span>
            <Link
              href={`mailto:${user.email}`}
              className="text-blue-500 hover:underline"
            >
              {user.email}
            </Link>
          </p>
        </div>
      </div>
      <div className="logout-btn-container flex justify-center mt-6">
        <Link href="/api/auth/logout">
          <button className="cursor-pointer border-none bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition duration-200">
            Log Out
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Profile;
