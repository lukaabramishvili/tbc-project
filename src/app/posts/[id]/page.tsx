'use client';

import Like from "../../../../public/like.png";
import Dislike from "../../../../public/dislike.png";
import ReturnButton from "../../components/ReturnButton/returnButton";
import { useEffect, useState } from "react";
import NotFoundPage from "@/app/NotFoundPage";

interface Post {
  id: number;
  title: string;
  body: string;
  like: number;
  dislike: number;
  tags: string[];
  views: number;
}

interface Params {
  id: string;
}

const getPost = async (id: string): Promise<Post | null> => {
  try {
    const response = await fetch(`/api/fetchPostsById?id=${id}`);
    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      console.error("Failed to fetch post.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function PostsDetails({ params }: { params: Params }) {
  const post = await getPost(params.id);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-md p-10 gap-7 container mx-auto">
      <h1 className="text-2xl font-bold dark:text-white">{post?.title}</h1>
      <p className="w-1/2 text-lg leading-8 dark:text-white">{post?.body}</p>
      <div className="flex items-center gap-11">
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Like.src} alt="like" className="w-5" />
          <p>{post?.like}</p>
        </div>
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Dislike.src} alt="dislike" className="w-5" />
          <p>{post?.dislike}</p>
        </div>
      </div>
      <p className="font-semibold dark:text-white">
        {/* Tags:{" "}
        {post?.tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}{" "} */}
      </p>
      <p className="text-sm text-gray-500 dark:text-white mb-4">
        views: {post?.views}
      </p>
      <div>
        <ReturnButton />
      </div>
    </div>
  );
}
