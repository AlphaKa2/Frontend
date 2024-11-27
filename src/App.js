/* eslint-disable no-unused-vars */
import React from "react";
import MainPage from "./pages/MainPage";
import "./index.css"; // Tailwind가 포함된 CSS 파일을 import
import "./App.css";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import { BrowserRouter, Routes, Route, MemoryRouter } from "react-router-dom";

import Post from "./pages/PostPage";


function App() {
  return (
    <>
      {/* <MemoryRouter>
        <CreatePostPage />
      </MemoryRouter> */}
      {/* <Alarm></Alarm> */}
      {/* <MainPage /> */}
      {/* <PostDetailPage/> */}
      <Post/>
    </>
  );
}

export default App;
