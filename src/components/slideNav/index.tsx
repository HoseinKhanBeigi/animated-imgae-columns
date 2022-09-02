import { forwardRef } from "react";
import { SlideNavigationProps } from "../../types"

export const SlideNavigation = forwardRef<HTMLDivElement, SlideNavigationProps>(({ navigation }, ref) => {
    return (
        <nav className="slidenav" ref={ref}>
            <button
                className="slidenav__item slidenav__item--prev"
                onClick={() => navigation("previous")}
            >
                Previous
            </button>
            <span>/</span>
            <button
                className="slidenav__item slidenav__item--next"
                onClick={() => navigation("next")}
            >
                Next
            </button>
        </nav>)
})