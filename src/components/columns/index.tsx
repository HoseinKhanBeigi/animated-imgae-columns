// @ts-nocheck
import React, { useEffect, useRef } from "react";
import { FigureImg } from "../figure";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
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
import { TextReveal } from "../textReveal";

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
    const contentWarpper: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const columnItems: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const isGridView: React.MutableRefObject<boolean> = useRef();
    const currentGridItem: React.MutableRefObject<any> = useRef();
    const contentNavItems: React.MutableRefObject<any> = useRef();
    const { one, two, three } = useAppSelector((state) => {
        return {
            one: state.photoSlice,
            two: state.photosSliceTwo,
            three: state.photosSliceThree,
        };
    });

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
                console.log(currentGridItem.current);
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

    const handleNavigation = (i: number) => {
        // console.log(currentGridItem.current);
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
            return idx === i
        });

        const currentItem = [...columnItems.current].find((e) => {
            if (e.getAttribute("data-current")) {
                e.removeAttribute("data-current");
                upcomingItem.setAttribute("data-current", "visible")
                return e
            };
        });
        timeline
            .set(
                currentItem,
                {
                    willChange: "transform, opacity",
                },
                "start"
            )
            .to(currentItem, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 1.2,
                opacity: 0,

                ease: "expo",
            }, "+.02")
            .to(
                upcomingItem,
                {
                    scale: calcTransformImage(upcomingItem).scale,
                    x: calcTransformImage(upcomingItem).x,
                    opacity: 1,
                    duration: 1.2,
                    y: calcTransformImage(upcomingItem).y,
                },
                "+.2"
            ).to(
                upcomingItem.querySelector(".column__item-caption"),
                {
                    opacity: 0,
                    duration: 0.3,
                },
                0
            );
    };

    const showContent = (event: MouseEvent<HTMLElement, MouseEvent>) => {
        lscroll.current.scroll.stop = true;
        event.stopPropagation();
        isGridView.current = true;
        currentGridItem.current = [...gridItemArr.current].find((e) => {
            return e.position === Number(event.currentTarget.children[0].dataset.pos);
        });

        const textReveal = new TextReveal(content.current.querySelector(".oh"));

        const timeline = gsap
            .timeline({
                defaults: {
                    ease: "expo.inOut",
                },
                onStart: () => {
                    content.current.classList.add("pointerEvent");
                },
            })
            .set([...contentWarpper.current.children], { x: "-3400%", opacity: 0 })
            .set([...columnWrap.current], { zIndex: 0 })
            .addLabel("start", 1)
            .add(() => {
                event.target.parentNode.parentNode.setAttribute(
                    "data-current",
                    "visible"
                );
            });

        timeline
            .to(
                content.current,
                {
                    opacity: 1,
                    duration: 0.1,
                    ease: "expo",
                },
                "-1"
            )
            .to([...columnItems.current], { opacity: 0, duration: 0.3 }, 0)

            .to(
                event.currentTarget,
                {
                    scale: calcTransformImage(event.currentTarget).scale,
                    x: calcTransformImage(event.currentTarget).x,
                    opacity: 1,
                    duration: 1.2,
                    y: calcTransformImage(event.currentTarget).y,
                },
                0
            )
            .to(
                event.currentTarget.querySelector(".column__item-caption"),
                {
                    opacity: 0,
                    duration: 0.3,
                },
                0
            );
        for (const [position, viewportGridItem] of [
            ...contentWarpper.current.children,
        ].entries()) {
            timeline.to(
                viewportGridItem,
                {
                    ease: "expo",
                    x: 0,
                    opacity: 1,
                    duration: 2,
                    stagger: 0.2,
                },
                0
            );
        }
        const text = content.current.querySelector(".content__item-text");
        timeline
            .addLabel("showContent", "start+=0.2")
            .add(() => {
                content.current
                    .querySelector(".content__item")
                    .classList.add("content__item--current");
                document.body.classList.add("view-content");
            }, "showContent")

            .to(
                text,
                {
                    opacity: 1,
                },
                "showContent"
            )
            .add(() => {
                textReveal.in();
            }, 0);
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
                        />
                    ))}
                </div>
            </div>
            <div className="content" ref={content}>
                <div className="content__item">
                    <h2 className="content__item-title oh">
                        <span className="oh__inner">Lucky Wood</span>
                    </h2>
                    <div className="content__item-text">
                        <span>
                            Faith, you're driving me away You do it every day You don't mean
                            it But it hurts like hell
                        </span>
                        <span>2019</span>
                    </div>
                </div>
                <nav className="navigation">
                    <div className="content__nav-wrapper" ref={contentWarpper}>
                        {[...one.photos, ...two.photosTwo, ...three.photosThree].map(
                            (el, i) => {
                                return (
                                    <img
                                        onClick={() => handleNavigation(i)}
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
