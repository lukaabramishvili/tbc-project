"use client";

import { useEffect, useState } from "react";
import Like from "../../../../public/like.png";
import Dislike from "../../../../public/dislike.png";
import ReturnButton from "../../components/ReturnButton/returnButton";
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

export default function PostsDetails({ params }: { params: Params }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/fetchPostsById?id=${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch post.");

        const { data } = await response.json();
        console.log("Fetched post:", data); 
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

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
  
  if (!post) return <NotFoundPage />;

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-md p-10 gap-7 container mx-auto">
      <h1 className="text-2xl font-bold dark:text-white">{post.title}</h1>
      <p className="w-1/2 text-lg leading-8 dark:text-white">{post.body}</p>

      <div className="flex items-center gap-11">
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Like.src} alt="like" className="w-5" />
          <p>{post.like}</p>
        </div>
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Dislike.src} alt="dislike" className="w-5" />
          <p>{post.dislike}</p>
        </div>
      </div>

      {/* {post.tags?.length > 0 && (
        <p className="font-semibold dark:text-white">
          Tags: {post.tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </p>
      )} */}

      <p className="text-sm text-gray-500 dark:text-white mb-4">Views: {post.views}</p>

      <div>
        <ReturnButton />
      </div>
    </div>
  );
}
