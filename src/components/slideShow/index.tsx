import { useEffect, useRef } from "react";
import { withInitialFetch } from "../hoc"

const SlideShow = ({ photos, status }: any) => {
    const slideShowElemeny: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const slides: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const nav: React.MutableRefObject<HTMLDivElement | any> = useRef();

    useEffect(() => {
        if (status === "succeeded") {
            [...slides.current.children][0].classList.add("slide--current");
        }

        console.log(slides.current);

    }, [status]);

    const init = () => {
        const slidesTotal = [...slides.current.children].length;
        createFrame();
        initEvents();
    }

    const calculatePath = (path = "initial") => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const frameSize = rect.width / 12;
        return path === "initial"
            ? `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width},0 0,0 Z M 0,0 ${rect.width},0 ${rect.width},${rect.height} 0,${rect.height} Z`
            : `M 0,0 0,${rect.height} ${rect.width},${rect.height} ${rect.width
            },0 0,0 Z M ${frameSize},${frameSize} ${rect.width - frameSize
            },${frameSize} ${rect.width - frameSize},${rect.height - frameSize
            } ${frameSize},${rect.height - frameSize} Z`;
    }

    const createFrame = () => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const paths = {
            initial: calculatePath("initial"),
            final: calculatePath("final"),
        };
        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );
        svg.setAttribute("class", "shape");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute(
            "viewbox",
            `0 0 ${rect.width} ${rect.height}`
        );
        svg.innerHTML = `<path fill=""#f1f1f1"" d="${paths.initial}"/>`;
        slideShowElemeny.current.insertBefore(svg, nav.current);
        const shape = svg.querySelector("path");

    }

    const initEvents = () => {

    }

    const navigation = () => {

    }

    const handleslideShow = () => {

    }

    return (
        <div className="slideshow" ref={slideShowElemeny}>
            <div className="slides" ref={slides}>
                {status === "succeeded" && photos.map((el: any, index: number) => {
                    return (<div className="slide" key={index}>

                        <img
                            className="slide__img"
                            src={el.url}
                            alt="A description of the image."
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 66em) 33vw,
                        (min-width: 44em) 50vw,
                                        100vw"
                        />

                        <h2 className="slide__title"> {el.title}</h2>
                        <p className="slide__desc">{el.desc}</p>
                        <a className="slide__link">name</a>
                    </div>)
                })}

            </div>
            <nav className="slidenav" ref={nav}>
                <button className="slidenav__item slidenav__item--prev">Previous</button>
                <span>/</span>
                <button className="slidenav__item slidenav__item--next">Next</button>
            </nav>
        </div>
    );
};


export default withInitialFetch(SlideShow);