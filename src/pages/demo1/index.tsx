import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import SlideShow from "../../components/slideShow";
import { slide } from "../../types";
// import "./index.scss"

const Demo1 = ({ }) => {
    return (
        <SlideShow page="1" />
    );
};
export default Demo1;
