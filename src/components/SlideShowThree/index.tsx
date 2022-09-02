import {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { withInitialFetch } from "../hoc";
import FigureMain from "../mainFigure";
import { SlideNavigation } from "../slideNav"
import { calculatePathThree, debounce } from "../../utils";
import anime from "animejs";

const SlideShowThree = ({ photos, status, settings }: any) => {
    const slideShowElemeny: React.MutableRefObject<HTMLDivElement | any> =
        useRef();
    const slides: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const nav: React.MutableRefObject<HTMLDivElement | any> = useRef();
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
            initial: calculatePathThree("initial", rect),
            final: calculatePathThree("final", rect),
        };
        svg.current.setAttribute("class", "shape");
        svg.current.setAttribute("width", "100%");
        svg.current.setAttribute("height", "100%");
        svg.current.setAttribute("viewbox", `0 0 ${rect.width} ${rect.height}`);
        let parentDiv = nav.current.parentNode;
        svg.current.innerHTML = `<defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ED4264">
                <!--animate attributeName="stop-color" values="#ED4264; #FFEDBC; #ED4264" dur="3s" repeatCount="indefinite"></animate-->
            </stop>
            <stop offset="100%" stop-color="#FFEDBC">
                <!--animate attributeName="stop-color" values="#FFEDBC; #ED4264; #FFEDBC" dur="3s" repeatCount="indefinite"></animate-->
            </stop>
        </linearGradient>
        </defs>
        <path fill="${settings.frameFill}" d="${paths.current.initial}"/>
    `;
        parentDiv.insertBefore(svg.current, nav.current);
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
        paths.current.initial = calculatePathThree("initial", rect);
        paths.current.final = calculatePathThree("final", rect);
        svg.current.setAttribute("viewbox", `0 0 ${rect.width} ${rect.height}`);
        shape.current.setAttribute("d", paths.current.initial);
    }, [])

    const navigation = useCallback((dir: string) => {
        if (isAnimating.current) return false;
        isAnimating.current = true;
        const currentSlide = [...slides.current.children][index.current];
        const rect = slideShowElemeny.current.getBoundingClientRect();
        const animateShapeInTimeline = anime.timeline({
            duration: settings.animation.shape.duration,
            easing: settings.animation.shape.easing.in
        });
        animateShapeInTimeline
            .add({
                targets: shape.current,
                d: paths.current.final.step1
            })
            .add({
                targets: shape.current,
                d: paths.current.final.step2,
                offset: `-=${settings.animation.shape.duration * .5}`
            })
            .add({
                targets: shape.current,
                d: paths.current.final.step3,
                offset: `-=${settings.animation.shape.duration * .5}`
            })
            .add({
                targets: shape.current,
                d: paths.current.final.step4,
                offset: `-=${settings.animation.shape.duration * .5}`
            });


        const animateSlides = () => {
            return new Promise<void>((resolve, reject) => {
                anime({
                    targets: currentSlide,
                    duration: settings.animation.slides.duration,
                    easing: settings.animation.slides.easing,
                    translateX: dir === 'next' ? -1 * rect.width : rect.width,
                    complete: () => {
                        currentSlide.classList.remove("slide--current");
                        resolve();
                    },
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
                    translateX: [dir === 'next' ? rect.width : -1 * rect.width, 0]
                });

                const newSlideImg = newSlide.querySelector(".slide__img");
                anime.remove(newSlideImg);
                anime({
                    targets: newSlideImg,
                    duration: settings.animation.slides.duration * 4,
                    easing: settings.animation.slides.easing,
                    translateX: [dir === 'next' ? 200 : -200, 0]
                });

                const texts = [
                    newSlide.querySelector(".slide__title"),
                    newSlide.querySelector(".slide__desc"),
                    newSlide.querySelector(".slide__link"),
                ];

                texts.map((e) => {
                    anime({
                        targets: e,
                        duration: settings.animation.slides.duration * 2,
                        easing: settings.animation.slides.easing,
                        delay: (t, i) => i * 100 + 100,
                        translateX: [dir === 'next' ? 300 : -300, 0],
                        opacity: [0, 1]
                    });
                });
            });
        };

        const animateShapeOut = () => {
            const animateShapeOutTimeline = anime.timeline({
                duration: settings.animation.shape.duration,
                easing: settings.animation.shape.easing.out
            });
            animateShapeOutTimeline
                .add({
                    targets: shape.current,
                    d: paths.current.final.step3
                })
                .add({
                    targets: shape.current,
                    d: paths.current.final.step2,
                    offset: `-=${settings.animation.shape.duration * .5}`
                })
                .add({
                    targets: shape.current,
                    d: paths.current.final.step1,
                    offset: `-=${settings.animation.shape.duration * .5}`
                })
                .add({
                    targets: shape.current,
                    d: paths.current.initial,
                    offset: `-=${settings.animation.shape.duration * .5}`,
                    complete: () => isAnimating.current = false
                });
        }

        animateShapeInTimeline.finished.then(animateSlides).then(animateShapeOut);
    }, []);


    return (
        <div className="slideshow" ref={slideShowElemeny}>
            <div className="slides" ref={slides}>
                {photos.map((el: any, num: number) => (
                    <FigureMain
                        url={el.url}
                        title={el.title}
                        desc={el.desc}
                        key={num}
                    />
                ))}
            </div>
            <SlideNavigation ref={nav} navigation={navigation} />
        </div>
    );
};

export default SlideShowThree
