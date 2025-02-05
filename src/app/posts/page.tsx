'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SearchBar from "../components/searchBar/searchBar";
import SortComponent from "../components/sort/sortComponent";
import Like from "../../../public/like.png";
import Dislike from "../../../public/dislike.png";
import AddPostDialog from "../components/AddPostDialog/AddPostDialog";

interface Post {
  id: number;
  title: string;
  body: string;
  like: number;
  dislike: number;
  tags: string[];
  views: number;
}

const PostsFetch = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "";

  // Fetch posts from the API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/fetchPosts");
        if (response.ok) {
          const { data } = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts.");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, []);

  // Filter and sort posts
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "views-desc":
        return b.views - a.views;
      case "views-asc":
        return a.views - b.views;
      case "likes-desc":
        return b.like - a.like;
      case "likes-asc":
        return a.like - b.like;
      case "dislikes-desc":
        return b.dislike - a.dislike;
      case "dislikes-asc":
        return a.dislike - b.dislike;
      default:
        return 0;
    }
  });

  return (
    <div className="p-10 bg-gray-100 min-h-[80vh] dark:bg-gray-700">
      <h1 className="text-center text-4xl mb-8 dark:text-white">Posts</h1>
      <div className="flex items-center justify-between w-full mt-4 md:flex-row flex-col">
        <SearchBar searchType="posts" />
        <SortComponent sortType="posts" />
      </div>
      <div className="flex justify-center mb-4">
        <AddPostDialog />
      </div>
      <div className="flex flex-col gap-4">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="text-black dark:text-white">
              <div className="post hover:scale-105 flex flex-col items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-transform duration-300 ease-in-out">
                <h2 className="text-3xl mb-2">{post.title}</h2>
                <p className="text-lg leading-7 max-w-4xl">{post.body}</p>
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-2">
                    <img src={Like.src} alt="like" className="w-5" />
                    <p>{post.like}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={Dislike.src} alt="dislike" className="w-5" />
                    <p>{post.dislike}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-white mb-4">Views: {post.views}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-white">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default function PostsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PostsFetch />
    </Suspense>
  );
}
