import React, { useCallback, useEffect, useRef } from "react";
import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotos } from "../../store/actions";
import "./index.scss"
const Layout = ({ }) => {
    const path = useLocation();
    const classes = path.pathname.startsWith('/') && path.pathname.slice(1, path.pathname.length)
    const root: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const dispatch = useAppDispatch();
    const page = path.pathname.slice(path.pathname.length - 1);

    const handleClick = (value: any, page: number) => {
        [...root.current.querySelectorAll(".demo")].forEach((e) => {
            e.classList.remove("demo--current")
        });
        // dispatch(fetchPhotos({ page }));
    }

    return (
        <main className={`${classes}`}>
            <Outlet />
            <div className="content content--fixed">
                <nav className="demos" ref={root}>
                    <svg className="icon icon--keyboard">
                        <use xlinkHref="#icon-keyboard"></use>
                    </svg>
                    <Link className="demo" to="demo-1" onClick={(e: any) => handleClick(e, 1)}>
                        <span>Demo 1</span>
                    </Link>
                    <Link className="demo" to="demo-2" onClick={(e: any) => handleClick(e, 2)}>
                        <span>Demo 2</span>
                    </Link>
                    <Link className="demo" to="demo-3" onClick={(e: any) => handleClick(e, 3)}>
                        <span>Demo 3</span>
                    </Link>
                    <Link className="demo" to="demo-4" onClick={(e: any) => handleClick(e, 4)}>
                        <span>Demo 4</span>
                    </Link>
                    <Link className="demo" to="demo-5" onClick={(e: any) => handleClick(e, 5)}>
                        <span>Demo 5</span>
                    </Link>
                </nav>
            </div>
        </main>
    );
};
export default Layout;
