import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/useDispatch";
import { fetchPhotos } from "../../store/actions";

export const withInitialFetch = (Component: any) => (props: any) => {
    const { page } = props;
    const dispatch = useAppDispatch();
    const { status, photos } = useAppSelector((state) => state.photoSlice);
    useEffect(() => {
        if (status === "idle") {
            // dispatch(fetchPhotos({ page }));
        }
    }, [dispatch, status]);
    return (<Component {...props} photos={photos} status={status} />)
};
