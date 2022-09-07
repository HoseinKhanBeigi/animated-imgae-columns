import { forwardRef } from "react"
import { FigureImg } from "../figure"
export const Column = forwardRef<HTMLDivElement>(({ data }: any, ref) => {
    return (
        <div className="column" data-scroll-section ref={ref}>
            {data.photosTwo.map((e: any, i: number) => (
                // <FigureImg
                //     key={i}
                //     url={e.url}
                //     dataPos={e.dataSort}
                //     date={e.date}
                //     name={e.name}
                // />
                <></>
            ))}
        </div>
    )
})