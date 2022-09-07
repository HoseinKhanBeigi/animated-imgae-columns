import { MouseEvent, useEffect } from "react"
import { FigureImgProps } from "../../types"

export const FigureImg: React.FC<FigureImgProps> = ({ dataPos, url, name, date, showContent }) => {

    return (
        <figure className="column__item" onClick={showContent}>
            <div className="column__item-imgwrap" data-pos={dataPos} >
                <img
                    className="column__item-img"
                    src={url}
                    loading="lazy"
                    decoding="async"
                ></img>

            </div>
            <figcaption className="column__item-caption">
                <span>{name}</span>
                <span>{date}</span>
            </figcaption>
        </figure>
    )
}