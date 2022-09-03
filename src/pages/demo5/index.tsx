import { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotosFive } from "../../store/actions";
import SlideShowFive from "../../components/SlideShowFive";
const Demo5 = () => {
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 600,
                    easing: 'easeOutQuint'
                },
                shape: {
                    duration: 300,
                    easing: { in: 'easeOutQuint', out: 'easeOutQuad' }
                }
            },
            frameFill: 'url(#pattern)'
        };
    }, []);
    const dispatch = useAppDispatch();
    const { status, photosFive } = useAppSelector(
        (state) => state.photosSliceFive
    );
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotosFive({ page: "5" }));
        }
    }, [dispatch, status]);
    return (
        <SlideShowFive settings={settings} status={status} photos={photosFive} />
    )
}
export default Demo5