import { useEffect } from "react"
import { FigureImgProps } from "../../types"

export const FigureImg: React.FC<FigureImgProps> = ({ dataPos, url, name, date }) => {
    return (
        <figure className="column__item">
            <div className="column__item-imgwrap" data-pos={dataPos}>
                <div className="column__item-img" style={{ backgroundImage: `url(${url})` }}></div>
            </div>
            <figcaption className="column__item-caption">
                <span>{name}</span>
                <span>{date}</span>
            </figcaption>
        </figure>
    )
}