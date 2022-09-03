import { FigureImg } from "../figure"
export const Columns = () => {
    return (
        <div className="columns" data-scroll-container>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    <FigureImg />
                </div>
            </div>
            <div className="column-wrap">
                <div className="column" data-scroll-section>
                    <FigureImg />
                </div>
            </div>
            <div className="column-wrap column-wrap--height">
                <div className="column">
                    <FigureImg />
                </div>
            </div>
        </div>
    )

}