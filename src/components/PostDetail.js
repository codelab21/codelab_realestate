// PostDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import useFirestore from "../hooks/useFirestore";

const PostDetail = () => {
  const { id } = useParams();
  const { posts } = useFirestore();

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Post Detail</h2>
      <p>
        <strong>Posted by:</strong> {post.userEmail}
      </p>
      <p>{post.content}</p>
      {post.images &&
        post.images.map((imageUrl) => (
          <img
            src={imageUrl}
            alt="Post"
            key={imageUrl}
            style={{ maxWidth: "200px" }}
          />
        ))}
    </div>
  );
};

export default PostDetail;
