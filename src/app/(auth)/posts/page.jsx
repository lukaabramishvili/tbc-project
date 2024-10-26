import "./index.css";
import Like from "../../../../public/like.png";
import Dislike from "../../../../public/dislike.png";
import Link from "next/link";
import SearchBar from "../../components/searchBar/searchBar";
import NotFoundPage from "../../NotFoundPage"

async function PostsFetch({searchParams}){

  const searchTerm = searchParams.search || "";

  try {
    let url = "https://dummyjson.com/posts";
    if(searchTerm){
        url = `https://dummyjson.com/posts/search?q=${searchTerm}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    const posts = data.posts || [];

  

  return (
    <div className="postContainer">
      <h1 className="postTitle">Posts</h1>
      <div className="searchPosts">
        <SearchBar searchType={"posts"}/>
      </div>
        <div className="posts">
          {posts.map((post) => (
              <Link key={post.id} className="postLink" href={`/posts/${post.id}`}>
            <div key={post.id} className="post">
                <h2 className="postTitle">{post.title}</h2>
              <p className="postContent">{post.body}</p>
              <div className="reactions">
                <div className="like">
                  <img src={Like.src} alt="like" />
                  <p>{post.reactions.likes}</p>
                </div>
                <div className="dislike">
                  <img src={Dislike.src} alt="dislike" />
                  <p>{post.reactions.dislikes}</p>
                </div>
              </div>
              <p className="postTags">
                Tags:{" "}
                {post.tags.map((tag, index) => (
                  <span key={index}>#{tag}</span>
                ))}{" "}
              </p>
              <p className="postViwes">views: {post.views}</p>
            </div>
                </Link>
          ))}
        </div>
    
    </div>
  ); }
  catch (error) {
  console.log("Error fetching data: ", error);
  return <NotFoundPage />;
}

};

export default PostsFetch;