import { useMemo, useEffect } from "react";
import SlideShowTwo from "../../components/SlideShowTwo";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotosTwo } from "../../store/actions";
const Demo2 = () => {
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 600,
                    easing: "easeOutQuint",
                },
                shape: {
                    duration: 300,
                    easing: { in: "easeOutQuad", out: "easeOutQuad" },
                },
            },
            frameFill: "#111",
        }
    }, []);
    const dispatch = useAppDispatch();
    const { status, photosTwo } = useAppSelector((state) => state.photosSliceTwo);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotosTwo({ page: "2" }));
        }
    }, [dispatch, status]);


    return (
        <SlideShowTwo settings={settings} status={status} photos={photosTwo} />
    )
}
export default Demo2