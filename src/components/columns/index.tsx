// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { FigureImg } from "../figure";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { usePreLoadImg } from "../../hooks/usePreloadImg"
import {
    fetchPhotos,
    fetchPhotosTwo,
    fetchPhotosThree,
} from "../../store/actions";
import { adjustedBoundingRect, winsize } from "../../utils";
import gsap from "gsap";
import LocomotiveScroll from "locomotive-scroll";
import { useLayoutEffect } from "react";
import { useCallback } from "react";

export const Columns = () => {
    const dispatch = useAppDispatch();
    const columnsRoot: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const lastscroll: React.MutableRefObject<number> = useRef(0);
    const oddColumns: React.MutableRefObject<any> = useRef(null);
    const gridItems: React.MutableRefObject<any> = useRef(null);
    const contentItems: React.MutableRefObject<any> = useRef(null);
    const gridItemArr: React.MutableRefObject<any> = useRef([]);
    const contentNav: React.MutableRefObject<any> = useRef();
    const lscroll: React.MutableRefObject<any> = useRef();
    const columnWrap: React.MutableRefObject<any> = useRef();
    const content: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const navigationWarpper: React.MutableRefObject<HTMLDivElement | any> =
        useRef();
    const columnItems: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const isGridView: React.MutableRefObject<boolean> = useRef();
    const currentGridItem: React.MutableRefObject<any> = useRef();
    const contentNavItems: React.MutableRefObject<any> = useRef();
    const [title, setTitle] = useState("");
    const { one, two, three } = useAppSelector((state) => {
        return {
            one: state.photoSlice,
            two: state.photosSliceTwo,
            three: state.photosSliceThree,
        };
    });
    const imgsLoaded = usePreLoadImg([...one.photos, ...two.photosTwo, ...three.photosThree]);

    useEffect(() => {
        if (one.status === "idle") {
            dispatch(fetchPhotos({ page: "1" }));
            dispatch(fetchPhotosTwo({ page: "2" }));
            dispatch(fetchPhotosThree({ page: "3" }));
        }
    }, [dispatch, one.status, two.status, three.status]);

    const GridItem = useCallback((el: any) => {
        const imgOuter = el.querySelector(".column__item-imgwrap");
        const imgInner = el.querySelector(".column__item-img");
        const position = Number(el.dataset.pos);
        const caption = el.querySelector("figcaption");
        return {
            el,
            imgOuter,
            imgInner,
            position,
            caption,
        };
    }, []);

    useLayoutEffect(() => {
        if (
            one.status === "succeeded" &&
            two.status === "succeeded" &&
            three.status === "succeeded"
        ) {
            oddColumns.current = [
                ...columnsRoot.current.querySelectorAll(".column"),
            ].filter((_, index) => index != 1);
            gridItems.current = [
                ...columnsRoot.current.querySelectorAll(".column__item-imgwrap"),
            ];
            columnItems.current = [
                ...columnsRoot.current.querySelectorAll(".column__item"),
            ];
            contentNavItems.current = [
                ...columnsRoot.current.querySelectorAll(".content__nav-item"),
            ];
            contentNav.current = [
                ...columnsRoot.current.querySelectorAll("content__nav"),
            ];

            columnWrap.current = [
                ...columnsRoot.current.querySelectorAll(".column-wrap"),
            ];

            contentItems.current = [
                ...columnsRoot.current.querySelectorAll(".content__item"),
            ];
            gridItems.current.forEach((gridItem) => {
                const newItem = GridItem(gridItem);
                gridItemArr.current.push(newItem);
            });
            trackVisibleItems();
        }
    }, [one.status, two.status, three.status]);

    useLayoutEffect(() => {
        if (
            one.status === "succeeded" &&
            two.status === "succeeded" &&
            three.status === "succeeded"
        ) {
            initSmoothScroll();
            window.addEventListener("resize", () => {
                if (currentGridItem.current) {
                    gsap.set(currentGridItem.current.el, {
                        scale: calcTransformImage(currentGridItem.current.el).scale,
                        x: calcTransformImage(currentGridItem.current.el).x,
                        y: calcTransformImage(currentGridItem.current.el).y,
                    });
                }
            });
        }
    }, [one.status, two.status, three.status]);

    const initSmoothScroll = () => {
        lscroll.current = new LocomotiveScroll({
            el: columnsRoot.current,
            smooth: true,
            lerp: 0.13,
            smartphone: { smooth: true },
            tablet: { smooth: true },
        });
        lscroll.current.on("scroll", (obj) => {
            lastscroll.current = obj.scroll.y;
            oddColumns.current.forEach(
                (column) => (column.style.transform = `translateY(${obj.scroll.y}px)`)
            );
        });
    };

    const trackVisibleItems = () => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.intersectionRatio > 0) {
                    entry.target.classList.add("in-view");
                } else {
                    entry.target.classList.remove("in-view");
                }
            });
        });
        [...gridItems.current].forEach((item) => observer.observe(item));
    };

    const calcTransformImage = (item) => {
        const imgrect = adjustedBoundingRect(item);

        return {
            scale: (winsize.height * 0.7) / imgrect.height,
            x: winsize.width * 0.5 - (imgrect.left + imgrect.width / 2),
            y: winsize.height * 0.5 - (imgrect.top + imgrect.height / 2),
        };
    };

    const handleNavigation = (i: number, name: string) => {
        const innerText = content.current.querySelector(".oh__inner");
        const timeline = gsap.timeline({
            defaults: {
                ease: "expo.inOut",
            },
            onStart: () => {
                document.body.classList.remove("oh");
            },
            onComplete: () => { },
        });



        const upcomingItem = [...columnItems.current].find((e, idx) => {
            if (idx === i) {
                return e
            }
        });

        const currentItem = [...columnItems.current].find((e) => {
            if (e.getAttribute("data-current")) {
                e.removeAttribute("data-current");
                upcomingItem.setAttribute("data-current", "visible");
                return e;
            }
        });



        timeline
            .to(currentItem, {
                scale: 1,
                x: calcTransformImage(currentItem).x,
                y: calcTransformImage(currentItem).y,
                duration: 1.2,
                opacity: 0,
                ease: "expo",
            })
            .to(
                upcomingItem,
                {
                    scale: calcTransformImage(upcomingItem).scale,
                    x: calcTransformImage(upcomingItem).x,
                    opacity: 1,
                    duration: 1.2,
                    y: calcTransformImage(upcomingItem).y,
                    onComplete: () => {
                        [...columnItems.current].map((e) => {
                            if (!e.getAttribute("data-current")) {
                                timeline.to(
                                    e,
                                    {
                                        opacity: 0,
                                        scale: 1,
                                        x: calcTransformImage(e).x,
                                        y: calcTransformImage(e).y,
                                    },
                                    0
                                );
                            }
                        });
                    }
                },
                "-=.4"
            )
            .to(innerText, {
                y: "120%",
                rotate: 15,
            })
            .add(() => {
                setTitle(name);
            })

            .to(innerText, {
                y: "0%",
                rotate: 0,
                stagger: 0.03,
                duration: 1.2,
            })
            .to(
                upcomingItem.querySelector(".column__item-caption"),
                {
                    opacity: 0,
                    duration: 0.3,
                },
                0
            );
    };

    const showContent = (
        event: MouseEvent<HTMLElement, MouseEvent>,
        name: string
    ) => {
        lscroll.current.scroll.stop = true;
        event.stopPropagation();

        setTitle(name);

        isGridView.current = true;
        currentGridItem.current = [...columnItems.current].find((e) => {
            return (
                Number(e.children[0].dataset.pos) ===
                Number(event.currentTarget.children[0].dataset.pos)
            );
        });

        const remainingGridItems = [...columnItems.current].filter((e) => {
            return (
                Number(e.children[0].dataset.pos) !==
                Number(event.currentTarget.children[0].dataset.pos)
            );
        });
        const currentItem = event.currentTarget;
        const backButton = content.current.querySelector(".button-back");
        const contentItem = content.current.querySelector(".content__item");
        const innerText = content.current.querySelector(".oh__inner");
        const innerDesc = content.current.querySelector(".content__item-text");

        const caption = event.currentTarget.querySelector(".column__item-caption");
        gsap.killTweensOf([currentItem, remainingGridItems]);
        const timeline = gsap.timeline({
            defaults: {
                ease: "expo.inOut",
            },
            onStart: () => {
                gsap.set(navigationWarpper.current, { y: 100 });
                document.body.classList.add("oh");
            },
        });

        timeline
            .to(currentItem, {
                pointerEvents: "none",
                opacity: 1,
                scale: calcTransformImage(currentItem).scale,
                x: calcTransformImage(currentItem).x,
                y: calcTransformImage(currentItem).y,
                duration: 1,
            })

            .add(() => {
                currentItem.setAttribute("data-current", "visible");
            })
            .set(content.current, { opacity: 1, pointerEvents: "auto", zIndex: 1 })
            .to(navigationWarpper.current, { y: 0, duration: 1 })
            .to(backButton, { opacity: 1, duration: 1.2 }, "-=.3")
            .set(innerText, {
                y: "120%",
                rotate: 15,
            })
            .add(() => {
                contentItem.classList.add("content__item--current");
                document.body.classList.add("view-content");
            })
            .to(innerText, {
                y: "0%",
                rotate: 0,
                stagger: 0.03,
                duration: 1.2,
            })
            .to(innerDesc, { opacity: 1, duration: 1.2 })
            .to(caption, { opacity: 0, duration: 1.2 }, 0);

        [...remainingGridItems].forEach((el, pos) => {
            timeline
                .to(
                    el,
                    { opacity: 0, pointerEvents: "none", duration: 1.2, zIndex: 0 },
                    0
                )
                .set(el, { y: calcTransformImage(el).y, x: calcTransformImage(el).x });
        });
    };

    const closeContent = () => {
        const currentItem = [...columnItems.current].find((e) => {
            if (e.getAttribute("data-current")) {
                e.removeAttribute("data-current");
                return e;
            }
        });
        initSmoothScroll();
        lscroll.current.scrollTo(lastscroll.current, {
            duration: 0,
            disableLerp: true,
        });
        const contentItem = content.current.querySelector(".content__item");
        const innerText = content.current.querySelector(".oh__inner");
        const backButton = content.current.querySelector(".button-back");
        const caption = currentItem.querySelector(".column__item-caption");
        const remainingGridItems = [...columnItems.current].filter((e) => {
            return (
                Number(e.children[0].dataset.pos) !==
                Number(currentItem.children[0].dataset.pos)
            );
        });
        gsap.killTweensOf([currentItem, remainingGridItems]);
        const timeline = gsap.timeline({
            defaults: {
                ease: "expo.inOut",
            },
            onStart: () => {
                document.body.classList.remove("oh");
                document.body.classList.remove("view-content");
            },
            onComplete: function () {
                gsap.set(remainingGridItems, { clearProps: "all" });
                gsap.set(currentItem, { clearProps: "all" });
            },
        });

        timeline
            .to(navigationWarpper.current, { y: 300, duration: 1 })
            .to(currentItem, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 1,
            })

            .to(innerText, {
                y: "-120%",
                rotate: -5,
                stagger: 0.03,
            })

            .to(backButton, { opacity: 0, duration: 1.2 }, 0)
            .to(content.current, { opacity: 0, pointerEvents: "none", zIndex: 0 })
            .to(caption, { opacity: 1, duration: 1.2 }, 0)
            .add(() => {
                contentItem.classList.remove("content__item--current");
            });

        [...remainingGridItems].forEach((element, pos) => {
            timeline
                .to(
                    element,
                    { opacity: 1, x: 0, y: 0, duration: 1.2, pointerEvents: "auto" },
                    2.5
                )
                .to(
                    element.querySelector(".column__item-caption"),
                    {
                        opacity: 1,
                    },
                    0
                );
        });
    };

    return (
        <div className="columns" data-scroll-container ref={columnsRoot}>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    {one.photos.map((e, i) => (
                        <FigureImg
                            key={i}
                            url={e.url}
                            dataPos={e.dataSort}
                            date={e.date}
                            name={e.name}
                            showContent={showContent}
                            imgsLoaded={imgsLoaded}
                        />
                    ))}
                </div>
            </div>
            <div className="column-wrap">
                <div className="column" data-scroll-section>
                    {two.photosTwo.map((e, i) => (
                        <FigureImg
                            key={i}
                            url={e.url}
                            dataPos={e.dataSort}
                            date={e.date}
                            name={e.name}
                            showContent={showContent}
                            imgsLoaded={imgsLoaded}
                        />
                    ))}
                </div>
            </div>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    {three.photosThree.map((e, i) => (
                        <FigureImg
                            key={i}
                            url={e.url}
                            dataPos={e.dataSort}
                            date={e.date}
                            name={e.name}
                            showContent={showContent}
                            imgsLoaded={imgsLoaded}
                        />
                    ))}
                </div>
            </div>
            <div className="content" ref={content}>
                <div className="content__item">
                    <h2 className="content__item-title oh">
                        <span className="oh__inner">{title}</span>
                    </h2>
                    <div className="content__item-text">
                        <span>
                            Faith, you're driving me away You do it every day You don't mean
                            it But it hurts like hell
                        </span>
                        <span>2019</span>
                    </div>
                </div>
                <button className="unbutton button-back" onClick={() => closeContent()}>
                    back
                </button>
                <nav className="navigation">
                    <div className="content__nav-wrapper" ref={navigationWarpper}>
                        {[...one.photos, ...two.photosTwo, ...three.photosThree].map(
                            (el, i) => {
                                return (
                                    <img
                                        onClick={() => handleNavigation(i, el.name)}
                                        key={i}
                                        className="content__nav-item"
                                        src={el.url}
                                        loading="lazy"
                                        decoding="async"
                                    ></img>
                                );
                            }
                        )}
                    </div>
                </nav>
            </div>
        </div>
    );
};


