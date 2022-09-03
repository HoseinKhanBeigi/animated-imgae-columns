import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import { withInitialFetch } from "../hoc";
import FigureMain from "../mainFigure";
import { SlideNavigation } from "../slideNav";
import { calculatePathSix, debounce } from "../../utils";
import anime from "animejs";

const SlideShowSix = ({ photos, status, settings }: any) => {
    const slideShowElemeny: React.MutableRefObject<HTMLDivElement | any> =
        useRef();
    const slides: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const nav: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const titles: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const isAnimating: React.MutableRefObject<boolean> = useRef(false);
    const paths: React.MutableRefObject<any> = useRef({
        initial: 0,
        final: 0,
    });
    const svg: React.MutableRefObject<SVGPathElement | any> = useRef();
    const shape: React.MutableRefObject<SVGPathElement | any> = useRef();
    const index: React.MutableRefObject<number> = useRef(0);

    useLayoutEffect(() => {
        if (status === "succeeded") {
            [...slides.current.children][0].classList.add("slide--current");
            createFrame();
            initEvents();
        }
    }, [status]);

    const createFrame = useCallback(() => {
        const rect = slideShowElemeny.current.getBoundingClientRect();
        svg.current = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        paths.current = {
            initial: calculatePathSix("initial", rect),
            final: calculatePathSix("final", rect),
        };
        svg.current.setAttribute("class", "shape");
        svg.current.setAttribute("width", "100%");
        svg.current.setAttribute("height", "100%");
        svg.current.setAttribute("viewbox", `0 0 ${rect.width} ${rect.height}`);
        let parentDiv = titles.current.parentNode;
        svg.current.innerHTML = `
        <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#09012d"/>
            <stop offset="100%" stop-color="#0f2b73"/>
        </linearGradient>
        </defs>
        <path fill="${settings.frameFill}" d="${paths.current.initial}"/>`;
        parentDiv.insertBefore(svg.current, titles.current);
        shape.current = svg.current.querySelector('path')
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
        paths.current.initial = calculatePathSix("initial", rect);
        paths.current.final = calculatePathSix("final", rect);
        svg.current.setAttribute("viewbox", `0 0 ${rect.width} ${rect.height}`);
        shape.current.setAttribute('d', isAnimating.current ? paths.current.final : paths.current.initial);
    }, []);

    const navigation = useCallback((dir: string) => {
        if (isAnimating.current) return false;
        isAnimating.current = true;
        const currentSlide = [...slides.current.children][index.current];
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const animateShapeIn = anime({
            targets: shape.current,
            duration: settings.animation.shape.duration,
            easing: settings.animation.shape.easing.in,
            d: paths.current.final
        });

        const animateSlides = () => {
            return new Promise<void>((resolve, reject) => {
                anime({
                    targets: currentSlide,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    translateY: dir === 'next' ? rect.height : -1 * rect.height,
                    complete: () => {
                        currentSlide.classList.remove('slide--current');
                        resolve();
                    }
                });
                const currentTitleSlide = [...titles.current.children][index.current];
                anime({
                    targets: currentTitleSlide.children,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    delay: (t, i, total) => dir === 'next' ? i * 100 : (total - i - 1) * 100,
                    translateY: [0, dir === 'next' ? 100 : -100],
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
                    translateY: [dir === 'next' ? -1 * rect.height : rect.height, 0]
                });

                const newSlideImg = newSlide.querySelector(".slide__img");
                anime.remove(newSlideImg);
                anime({
                    targets: newSlideImg,
                    duration: settings.animation.slides.duration * 3,
                    easing: settings.animation.slides.easing,
                    translateY: [dir === 'next' ? -100 : 100, 0],
                    scale: [0.2, 1]
                });

                const newTitleSlide = [...titles.current.children][index.current];
                newTitleSlide.classList.add('slide--current');
                anime({
                    targets: newTitleSlide.children,
                    duration: settings.animation.slides.duration * 1.5,
                    easing: settings.animation.slides.easing,
                    delay: (t, i, total) => dir === 'next' ? i * 100 + 100 : (total - i - 1) * 100 + 100,
                    translateY: [dir === 'next' ? -100 : 100, 0],
                    opacity: [0, 1]
                });
            });
        };

        const animateShapeOut = () => {
            anime({
                targets: shape.current,
                duration: settings.animation.shape.duration,
                easing: settings.animation.shape.easing.out,
                d: paths.current.initial,
                complete: () => isAnimating.current = false
            });
        }
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

export default SlideShowSix;
