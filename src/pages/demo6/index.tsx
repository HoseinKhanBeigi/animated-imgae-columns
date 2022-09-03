import { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotosSix } from "../../store/actions";
import SlideShowSix from "../../components/SlideShowSix";
const Demo6 = () => {
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 500,
                    easing: 'easeOutQuint'
                },
                shape: {
                    duration: 300,
                    easing: { in: 'easeOutQuint', out: 'easeOutQuad' }
                }
            },
            frameFill: 'url(#gradient1)'
        };
    }, []);
    const dispatch = useAppDispatch();
    const { status, photosSix } = useAppSelector(
        (state) => state.photosSliceSix
    );
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotosSix({ page: "6" }));
        }
    }, [dispatch, status]);
    return (
        <SlideShowSix settings={settings} status={status} photos={photosSix} />
    )
}
export default Demo6