import React, { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import useFirestore from "../hooks/useFirestore"; // Import the custom hook

const NewPost = () => {
  const [postContent, setPostContent] = useState(""); // Step 2: State to hold the post content
  const [images, setImages] = useState([]); // Step 2: State to hold the selected images
  const { user } = useAuthentication();
  const { error, sharePost } = useFirestore(); // Use the custom hook

  // Step 3: Function to handle file input change
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setImages(Array.from(selectedFiles));
  };

  // Step 4: Function to share the post
  const handleSharePost = async () => {
    const errorMessage = await sharePost(user, postContent, images);
    if (!errorMessage) {
      setPostContent(""); // Clear the post content after sharing
      setImages([]); // Clear the selected images after sharing
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <textarea
        placeholder="Enter post content"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleSharePost}>Share Post</button>
    </div>
  );
};

export default NewPost;
