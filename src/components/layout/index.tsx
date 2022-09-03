import React, { useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.scss"
const Layout = ({ }) => {
    const path = useLocation();
    const params = useParams();
    const history = useNavigate();
    const classes = path.pathname.startsWith('/') && path.pathname.slice(1, path.pathname.length)
    const root: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const handleClick = (value: any) => {
        [...root.current.querySelectorAll(".demo")].forEach((e) => {
            e.classList.remove("demo--current")
        });
        value.target.classList.add("demo--current");
    }

    useEffect(() => {
        if (path.pathname === "/") {
            history(`/demo-1`);
            [...root.current.querySelectorAll(".demo")][0].classList.add("demo--current")
        }
    }, [path.pathname])

    return (
        <main className={`${classes}`}>
            <Outlet />
            <div className="content content--fixed">
                <nav className="demos" ref={root}>
                    <svg className="icon icon--keyboard">
                        <use xlinkHref="#icon-keyboard"></use>
                    </svg>
                    <Link className="demo" to="demo-1" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 1</span>
                    </Link>
                    <Link className="demo" to="demo-2" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 2</span>
                    </Link>
                    <Link className="demo" to="demo-3" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 3</span>
                    </Link>
                    <Link className="demo" to="demo-4" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 4</span>
                    </Link>
                    <Link className="demo" to="demo-5" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 5</span>
                    </Link>
                    <Link className="demo" to="demo-6" onClick={(e: any) => handleClick(e)}>
                        <span>Demo 6</span>
                    </Link>
                </nav>
            </div>
        </main>
    );
};
export default Layout;
