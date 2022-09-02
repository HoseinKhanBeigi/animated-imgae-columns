import React, { useMemo, useEffect } from "react";
import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import SlideShowOne from "../../components/SlideShowOne";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotos } from "../../store/actions";
import { slide } from "../../types";

// import "./index.scss"

const Demo1 = ({ }) => {
    const path = useLocation();
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 600,
                    easing: "easeOutQuint",
                },
                shape: {
                    duration: 300,
                    easing: { in: "easeOutQuint", out: "easeOutQuad" },
                },
            },
            frameFill: "#f1f1f1",
        }
    }, []);
    const dispatch = useAppDispatch();
    const { status, photos } = useAppSelector((state) => state.photoSlice);
    console.log(status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotos({ page: "1" }));
        }
    }, [dispatch, status]);
    console.log(photos, "photos");

    return (
        <SlideShowOne status={status} photos={photos} />
    );
};
export default Demo1;
