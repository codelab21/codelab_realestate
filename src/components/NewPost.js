import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import useFirestore from "../hooks/useFirestore"; // Import the custom hook

const NewPostForm = () => {
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const { user } = useAuthentication();
  const { error, sharePost } = useFirestore();

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setImages(Array.from(selectedFiles));
  };

  const handleSharePost = async () => {
    const errorMessage = await sharePost(user, postContent, images);
    if (!errorMessage) {
      setPostContent("");
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 border border-gray-300 rounded-lg p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Upload a New Post
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <textarea
                id="postContent"
                name="postContent"
                rows="3"
                className="appearance-none block w-full p-3 border border-gray-300 rounded-md placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter post content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Choose Images (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M16 30a8 8 0 018 8 8 8 0 018 8M8 12a2 2 0 00-2 2v18a2 2 0 002 2h30a2 2 0 002-2V14a2 2 0 00-2-2H16l-4-4H8a2 2 0 00-2 2z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a Image</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        multiple
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                </div>
              </div>
              {images.length > 0 && (
                <div className="mt-2">
                  {images.map((image, index) => (
                    <span key={index} className="block text-gray-600">
                      {image.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={handleSharePost}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Heroicon name: solid/check */}
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Share Post
            </button>
          </div>
          <div className="mt-4">
            <Link
              to="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go Back to Home Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostForm;
