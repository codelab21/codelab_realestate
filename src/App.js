import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostDetail from "./components/PostDetail";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import AppBar from "./components/AppBar";
import NewPostForm from "./components/NewPost";

function App() {
  return (
    <Router>
      <AppBar />
      {/* <Authentication /> */}
      {/* Test for github push */}
      <Routes>
        <Route exact path="/" element={<Slider />} />
        <Route exact path="/:id" element={<PostDetail />} />
        <Route exact path="/newPost" element={<NewPostForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
