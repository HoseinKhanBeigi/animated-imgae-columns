import { useMemo, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotosFour } from "../../store/actions";
import SlideShowFour from "../../components/SlideShowFour";
export const Demo4 = () => {
    const settings = useMemo(() => {
        return {
            animation: {
                slides: {
                    duration: 400,
                    easing: "easeOutQuint",
                },
                shape: {
                    duration: 400,
                    easing: { in: "easeOutQuint", out: "easeInQuad" },
                },
            },
            frameFill: "#000",
        };
    }, []);
    const dispatch = useAppDispatch();
    const { status, photosFour } = useAppSelector(
        (state) => state.photosSliceFour
    );
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchPhotosFour({ page: "4" }));
        }
    }, [dispatch, status]);

    return (
        <SlideShowFour settings={settings} status={status} photos={photosFour} />
    );
};
