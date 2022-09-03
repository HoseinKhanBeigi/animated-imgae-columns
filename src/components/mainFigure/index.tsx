import { useState, memo } from "react";
import clsx from "clsx";

const FigureMain = ({ url, title, desc }: any) => {
    const [isLoaded, setIsLoaded] = useState(true);
    const handleOnLoad = () => {
        setIsLoaded(false);
    };
    return (
        <>
            <div className="slide">
                <img
                    className={clsx("slide__img", {
                        filterImg: isLoaded,
                    })}
                    src={url}
                    onLoad={handleOnLoad}
                    alt="A description of the image."
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 66em) 33vw,
                        (min-width: 44em) 50vw,
                                        100vw"
                />

                <h2 className="slide__title"> {title}</h2>
                <p className="slide__desc">{desc}</p>
            </div>
        </>
    );
};

export default FigureMain;
