import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { Demo1 } from "./pages/demo1";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Demo1 />} />
    </Routes>
  );
}






