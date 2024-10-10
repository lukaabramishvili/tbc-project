import React from 'react';
import "./index.css";

export default function Blog() {
    const posts = [
        {
          title: "Choosing the Best Laptop for Your Needs",
          date: "October 3, 2024",
          content:
            "Laptops come in various shapes, sizes, and configurations, catering to different types of users. Whether you're a gamer, a student, or a developer, picking the right laptop can significantly impact your productivity and enjoyment. "
            + "When selecting a laptop, you should consider several key factors: performance, display, battery life, portability, and budget. For developers, laptops with powerful processors and enough RAM (at least 16GB) are essential for smooth multitasking and running complex codebases. "
            + "For gamers, a high-refresh-rate display and a dedicated GPU like the NVIDIA GeForce series make a huge difference in the gaming experience. Students may want something lightweight and affordable, but with a good battery to last through lectures."
        },
        {
          title: "The Future of Frontend Development",
          date: "October 2, 2024",
          content:
            "Frontend development is constantly evolving with new technologies like React, Vue, and Angular. Understanding the trends and advancements will help developers stay ahead."
        },
        {
          title: "Why React is the Best Framework",
          date: "September 25, 2024",
          content:
            "React has become the go-to choice for developers. Its component-based architecture and large community support make it an excellent choice for building modern web apps."
        },
        {
          title: "CSS Tricks You Should Know",
          date: "September 10, 2024",
          content:
            "CSS can be tricky, but mastering a few key techniques will help you style your web apps like a pro. From flexbox to grid, this post covers the essentials."
        }
      ];

    return (
        <div className="blogContainer">
        <h1 className="blogTitle">Blog</h1>
            <div className="blogPosts">
            {posts.map((post, index) => (
                <div key={index} className="blogPost">
                <h2 className="postTitle">{post.title}</h2>
                <p className="postDate">{post.date}</p>
                <p className="postContent">{post.content}</p>
                </div>
            ))}
            </div>
        </div>
)
}
