"use client";

import { useEffect, useState } from "react";
import Like from "../../../../public/like.png";
import Dislike from "../../../../public/dislike.png";
import ReturnButton from "../../components/ReturnButton/returnButton";
import NotFoundPage from "@/app/NotFoundPage";
import { useLanguage } from "@/app/context/LanguageContext";

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

  const { language } = useLanguage()

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] flex flex-col justify-center items-center bg-white dark:bg-[#2C2758] rounded-lg shadow-md pt-16 pb-16 gap-7 px-4">
      <div className="max-w-4xl w-full text-center flex flex-col gap-10 ">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white">{post.title}</h1>
        <p className="w-full md:w-3/4 mx-auto text-lg md:text-xl leading-8 dark:text-white">
          {post.body}
        </p>
      </div>
      
      <div className="flex items-center gap-6 md:gap-11">
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Like.src} alt="like" className="w-5" />
          <p>{post.like}</p>
        </div>
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Dislike.src} alt="dislike" className="w-5" />
          <p>{post.dislike}</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-white mb-4">
        {language === "eng" ? "Views: " : "ნახვები: "} {post.views}
      </p>
      
      <div>
        <ReturnButton />
      </div>
    </div>
  );
  }
