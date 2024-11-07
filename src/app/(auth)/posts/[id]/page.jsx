import NotFoundPage from "../../../NotFoundPage";
import Like from "../../../../../public/like.png";
import Dislike from "../../../../../public/dislike.png";
import ReturnButton from "../../../components/ReturnButton/returnButton";

const getPosts = async (id) => {
  let res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    return null;
  }
  let post = await res.json();
  return post || null;
};

export async function generateStaticParams() {
  let postsData = await fetch("https://dummyjson.com/posts").then((res) =>
    res.json()
  );
  let posts = postsData.posts;

  return posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
}

export default async function PostsDetails({ params }) {
  let post = await getPosts(params.id);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-md p-10 gap-7 container mx-auto">
      <h1 className="text-2xl font-bold dark:text-white">{post.title}</h1>
      <p className="w-1/2 text-lg leading-8 dark:text-white">{post.body}</p>
      <div className="flex items-center gap-11">
        <div className="flex items-center gap-2 dark:text-white ">
          <img src={Like.src} alt="like" className="w-5" />
          <p>{post.reactions.likes}</p>
        </div>
        <div className="flex items-center gap-2 dark:text-white">
          <img src={Dislike.src} alt="dislike" className="w-5" />
          <p>{post.reactions.dislikes}</p>
        </div>
      </div>
      <p className="font-semibold dark:text-white">
        Tags:{" "}
        {post.tags.map((tag, index) => (
          <span key={index}>#{tag} </span>
        ))}{" "}
      </p>
      <p className="text-sm text-gray-500 dark:text-white mb-4">views: {post.views}</p>
      <div>
        <ReturnButton />
      </div>
    </div>
  );
}
