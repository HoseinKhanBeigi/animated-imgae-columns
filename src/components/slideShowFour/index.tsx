import {
    useCallback,
    useLayoutEffect,
    useRef,
} from "react";
import { SlideNavigation } from "../slideNav"
import { calculatePathFour, debounce } from "../../utils";
import map from './map.png';
import anime from "animejs";

const SlideShowFour = ({ photos, status, settings }: any) => {
    const slideShowElemeny: React.MutableRefObject<HTMLDivElement | any> =
        useRef();
    const slides: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const titles: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const nav: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const isAnimating: React.MutableRefObject<boolean> = useRef(false);
    const paths: React.MutableRefObject<any> = useRef({
        initial: 0,
        final: 0,
    });
    const svg: React.MutableRefObject<SVGPathElement | any> = useRef();
    const shape: React.MutableRefObject<SVGPathElement | any> = useRef();
    const index: React.MutableRefObject<number> = useRef(0);
    const imgFill: React.MutableRefObject<SVGPathElement | any> = useRef();

    useLayoutEffect(() => {
        if (status === "succeeded") {
            [...slides.current.children][0].classList.add("slide--current");
            createFrame();
            initEvents();
        }
    }, [status]);

    const calculateImgFillSizes = () => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const ratio = Math.max(rect.width / 1920, rect.height / 1140);
        return { width: 1920 * ratio, height: 1140 * ratio };
    }



    const createFrame = useCallback(() => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        svg.current = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        paths.current = {
            initial: calculatePathFour("initial", rect),
            final: calculatePathFour("final", rect),
        };
        svg.current.setAttribute("class", "shape");
        svg.current.setAttribute("width", "100%");
        svg.current.setAttribute("height", "100%");
        svg.current.setAttribute("viewbox", `0 0 ${rect.width} ${rect.height}`);
        let parentDiv = titles.current.parentNode;
        const imgFillSize = calculateImgFillSizes();
        svg.current.innerHTML = `
        <defs>
            <clipPath id="shape__clip">
                <path fill="${settings.frameFill}" d="${paths.current.initial}"/>
            </clipPath>
        </defs>
        <image xlink:href="${map}" clip-path="url(#shape__clip)" x="0" y="0" width="${imgFillSize.width}px" height="${imgFillSize.height}px"/>
    `;
        parentDiv.insertBefore(svg.current, titles.current);
        shape.current = svg.current.querySelector('path');
        imgFill.current = svg.current.querySelector('image');
    }, []);

    const initEvents = () => {
        window.addEventListener(
            "resize",
            debounce(() => {
                updateFrame();
            }, 20)
        );
    };

    const updateFrame = useCallback(() => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        paths.current.initial = calculatePathFour('initial', rect);
        paths.current.final = calculatePathFour('final', rect);
        svg.current.setAttribute('viewbox', `0 0 ${rect.width} ${rect.height}`);
        shape.current.setAttribute('d', isAnimating ? paths.current.final : paths.current.initial);
        const imgFillSize = calculateImgFillSizes();
        imgFill.current.setAttribute('width', `${imgFillSize.width}px`);
        imgFill.current.setAttribute('height', `${imgFillSize.height}px`);
    }, [])

    const navigation = useCallback((dir: string) => {
        if (isAnimating.current) return false;
        isAnimating.current = true;
        const currentSlide = [...slides.current.children][index.current];
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const animateShapeIn = anime({
            targets: shape.current,
            duration: settings.animation.shape.duration,
            easing: settings.animation.shape.easing.in,
            d: calculatePathFour('final', rect)
        });


        const animateSlides = () => {
            return new Promise<void>((resolve, reject) => {
                anime({
                    targets: currentSlide,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    translateX: dir === "next" ? -1 * rect.width : rect.width,
                    complete: () => {
                        currentSlide.classList.remove("slide--current");
                        resolve();
                    },
                });
                const currentTitleSlide = [...titles.current.children][index.current];
                anime({
                    targets: currentTitleSlide.children,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    delay: (t, i, total) => dir === 'next' ? i * 100 : (total - i - 1) * 100,
                    translateY: [0, dir === 'next' ? -100 : 100],
                    opacity: [1, 0],
                    complete: () => {
                        currentTitleSlide.classList.remove('slide--current');
                        resolve();
                    }
                });

                index.current =
                    dir === "next"
                        ? index.current < [...slides.current.children].length - 1
                            ? index.current + 1
                            : 0
                        : index.current > 0
                            ? index.current - 1
                            : [...slides.current.children].length - 1;

                const newSlide = [...slides.current.children][index.current];
                newSlide.classList.add("slide--current");
                anime({
                    targets: newSlide,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    translateX: [
                        dir === "next" ? rect.width : -1 * rect.width,
                        0,
                    ],
                });

                const newSlideImg = newSlide.querySelector(".slide__img");
                anime.remove(newSlideImg);
                anime({
                    targets: newSlideImg,
                    duration: settings.animation.slides.duration * 4,
                    easing: settings.animation.slides.easing,
                    translateY: [dir === "next" ? 100 : -100, 0],
                });

                const newTitleSlide = [...titles.current.children][index.current];
                newTitleSlide.classList.add("slide--current");
                anime({
                    targets: newTitleSlide.children,
                    duration: settings.animation.slides.duration * 2,
                    easing: settings.animation.slides.easing,
                    delay: (t, i, total) =>
                        dir === "next" ? i * 100 + 100 : (total - i - 1) * 100 + 100,
                    translateY: [dir === "next" ? 100 : -100, 0],
                    opacity: [0, 1],
                });

            });
        };

        const animateShapeOut = () => {
            anime({
                targets: shape.current,
                duration: settings.animation.shape.duration,
                easing: settings.animation.shape.easing.out,
                d: paths.current.initial,
                complete: () => (isAnimating.current = false),
            });
        };
        animateShapeIn.finished.then(animateSlides).then(animateShapeOut);
    }, []);


    return (
        <div className="slideshow" ref={slideShowElemeny}>
            <div className="slides" ref={slides}>
                {photos.map((el: any, num: number) => (
                    <div className="slide" key={num}>
                        <img
                            className={"slide__img"}
                            src={el.url}
                            onLoad={el.handleOnLoad}
                            alt="A description of the image."
                            loading="lazy"
                            decoding="async"
                            sizes="(min-width: 66em) 33vw,
                              (min-width: 44em) 50vw,
                                              100vw"
                        />
                    </div>
                ))}
            </div>
            <div className="slides slides--titles" ref={titles}>
                {photos.map((el: any, num: number) => (
                    <div className="slide" key={num}>
                        <h2 className="slide__title"> {el.title}</h2>
                    </div>
                ))}
            </div>
            <SlideNavigation ref={nav} navigation={navigation} />
        </div>
    );
};

export default SlideShowFour
