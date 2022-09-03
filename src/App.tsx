import { Routes, Route, Router } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import { Demo1 } from "./pages/demo1";
import { Demo2 } from "./pages/demo2";
import { Demo3 } from "./pages/demo3";
import { Demo4 } from "./pages/demo4";
import { Demo5 } from "./pages/demo5";
import { Demo6 } from "./pages/demo6";




export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route path="demo-1" element={<Demo1 />} />
        <Route path="demo-2" element={<Demo2 />} />
        <Route path="demo-3" element={<Demo3 />} />
        <Route path="demo-4" element={<Demo4 />} />
        <Route path="demo-5" element={<Demo5 />} />
        <Route path="demo-6" element={<Demo6 />} />
      </Route>
    </Routes>
  );
}






