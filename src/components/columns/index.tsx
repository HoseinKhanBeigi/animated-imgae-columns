// @ts-nocheck
import { useEffect, useRef } from "react"
import { FigureImg } from "../figure";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotos, fetchPhotosTwo, fetchPhotosThree } from "../../store/actions";
import LocomotiveScroll from 'locomotive-scroll';
import { useLayoutEffect } from "react";
import { useCallback } from "react";


export const Columns = () => {
    const dispatch = useAppDispatch();
    const columnsRoot: React.MutableRefObject<HTMLDivElement | any> = useRef();
    const lastscroll: React.MutableRefObject<number> = useRef(0);
    const oddColumns: React.MutableRefObject<any> = useRef(null);
    const gridItems: React.MutableRefObject<any> = useRef(null);
    const gridItemArr: React.MutableRefObject<any> = useRef([])
    const { one, two, three } = useAppSelector((state) => {
        return {
            one: state.photoSlice,
            two: state.photosSliceTwo,
            three: state.photosSliceThree
        }
    });

    useEffect(() => {
        if (one.status === "idle") {
            dispatch(fetchPhotos({ page: "1" }));
            dispatch(fetchPhotosTwo({ page: "2" }));
            dispatch(fetchPhotosThree({ page: "3" }));
        }
    }, [dispatch, one.status, two.status, three.status]);

    const GridItem = useCallback((el: any) => {
        const imgOuter = el.querySelector('.column__item-imgwrap');
        const imgInner = el.querySelector('.column__item-img');
        const position = Number(imgOuter.dataset.pos) - 1;
        const caption = el.querySelector('figcaption');
        return {
            imgOuter,
            imgInner,
            position,
            caption
        }
    }, [])


    useLayoutEffect(() => {
        if (one.status === "idle") {
            oddColumns.current = [...columnsRoot.current.querySelectorAll(".column")].filter(
                (_, index) => index != 1
            );
            gridItems.current = [...columnsRoot.current.querySelectorAll(".column__item")];
            gridItems.current.forEach((gridItem) => {
                const newItem = GridItem(gridItem);
                this.gridItemArr.push(newItem);
                // The ContentItem instance
                // newItem.contentItem = new ContentItem(
                //     this.DOM.contentItems[newItem.position]
                // );
            });

        }
    }, [one.status, two.status, three.status])

    useLayoutEffect(() => {
        window.addEventListener("scroll", initSmoothScroll);
        return () => {
            window.removeEventListener("resize", initSmoothScroll);
        }
    }, [one.status]);

    const initSmoothScroll = () => {
        const lscroll = new LocomotiveScroll({
            el: columnsRoot.current,
            smooth: true,
            lerp: 0.13,
            smartphone: { smooth: true },
            tablet: { smooth: true },
        });

        lscroll.on("scroll", (obj) => {
            lastscroll.current = obj.scroll.y;
            oddColumns.current.forEach(
                (column) => (column.style.transform = `translateY(${obj.scroll.y}px)`)
            );
        });
    }

    return (
        <div className="columns" data-scroll-container ref={columnsRoot}>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    {one.photos.map((e, i) => <FigureImg key={i} url={e.url} dataPos={e.dataSort} date={e.date} name={e.name} />)}
                </div>
            </div>
            <div className="column-wrap">
                <div className="column" data-scroll-section>
                    {two.photosTwo.map((e, i) => <FigureImg key={i} url={e.url} dataPos={e.dataSort} date={e.date} name={e.name} />)}
                </div>
            </div>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    {three.photosThree.map((e, i) => <FigureImg key={i} url={e.url} dataPos={e.dataSort} date={e.date} name={e.name} />)}
                </div>
            </div>
        </div>
    )
}