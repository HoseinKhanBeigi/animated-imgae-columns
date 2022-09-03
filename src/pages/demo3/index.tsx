import { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotosThree } from "../../store/actions";
import SlideShowThree from "../../components/SlideShowThree"
export const Demo3 = () => {
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 600,
                    easing: 'easeOutQuint'
                },
                shape: {
                    duration: 300,
                    easing: { in: 'easeOutQuad', out: 'easeOutQuad' }
                }
            },
            frameFill: 'url(#gradient1)'
        }
    }, [])
    const dispatch = useAppDispatch();
    const { status, photosThree } = useAppSelector((state) => state.photosSliceThree);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotosThree({ page: "3" }));
        }
    }, [dispatch, status]);

    return (
        <SlideShowThree settings={settings} status={status} photos={photosThree} />
    )
}
