import { useState, useEffect } from "react";
import { firebaseConfig } from "../firebase/firebase";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const useFirestore = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]); // State to hold the list of posts
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = [];
      snapshot.docs.forEach((postDoc) => {
        const post = { id: postDoc.id, ...postDoc.data() };
        postsData.push(post);
      });
      setPosts(postsData);
      setLoading(false); // Mark loading as false when the data is fetched
    });

    return () => unsubscribe();
  }, [db]);

  const sharePost = async (user, postContent, images) => {
    if (user) {
      try {
        const imageUrls = [];

        for (const image of images) {
          if (!image) {
            continue; // Skip undefined or null images
          }

          const storageRef = ref(storage, `images/${image.name}`);
          await uploadBytes(storageRef, image);
          const downloadURL = await getDownloadURL(storageRef);
          imageUrls.push(downloadURL);
        }

        await addDoc(collection(db, "posts"), {
          content: postContent,
          userId: user.uid,
          userEmail: user.email,
          createdAt: new Date(),
          images: imageUrls,
        });

        return null;
      } catch (error) {
        setError(error.message);
        return error.message;
      }
    } else {
      setError("Please log in to share a post.");
      return "Please log in to share a post.";
    }
  };

  return {
    error,
    sharePost,
    posts,
    loading, // Add the loading state to the returned object
  };
};

export default useFirestore;
