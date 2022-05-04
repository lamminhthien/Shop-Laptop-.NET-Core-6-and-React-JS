import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ToolBar from "./Toolbar";
import Sidebar from "./Sidebar";



export default function App() {
  return (
    <div className="App">
      <ToolBar/>
      <Sidebar/>
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}