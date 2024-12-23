import "./index.css";
import Like from "../../../public/like.png";
import Dislike from "../../../public/dislike.png";
import Link from "next/link";
import SearchBar from "../components/searchBar/searchBar";
import NotFoundPage from "../NotFoundPage";

async function PostsFetch({ searchParams }) {
  const searchTerm = searchParams.search || "";

  try {
    let url = "https://dummyjson.com/posts";
    if (searchTerm) {
      url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    const posts = data.posts || [];

    return (
      <div className="p-10 bg-gray-100 min-h-[80vh] dark:bg-gray-700">
        <h1 className="text-center text-4xl mb-8 dark:text-white">Posts</h1>
        <div className="w-full flex items-center justify-center mb-8">
          <SearchBar searchType={"posts"} />
        </div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="text-black dark:text-white ">
              <div className="post hover:scale-105 flex flex-col items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-transform duration-300 ease-in-out">
                <h2 className="text-3xl mb-2">{post.title}</h2>
                <p className="text-lg leading-7 max-w-4xl">{post.body}</p>
                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-2">
                    <img src={Like.src} alt="like" className="w-5" />
                    <p>{post.reactions.likes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src={Dislike.src} alt="dislike" className="w-5" />
                    <p>{post.reactions.dislikes}</p>
                  </div>
                </div>
                <p className="flex gap-2 font-bold mb-4">
                  Tags:{" "}
                  {post.tags.map((tag, index) => (
                    <span key={index}>#{tag}</span>
                  ))}{" "}
                </p>
                <p className="text-sm text-gray-500 dark:text-white mb-4">views: {post.views}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log("Error fetching data: ", error);
    return <NotFoundPage />;
  }
}

export default PostsFetch;
