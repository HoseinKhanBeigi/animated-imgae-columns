import React, { useMemo, useEffect } from "react";
import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import { Columns } from "../../components/columns"
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotos } from "../../store/actions";
import { slide } from "../../types";

// import "./index.scss"

export const Demo1 = ({ }) => {
    return (
        <Columns />
    );
};

