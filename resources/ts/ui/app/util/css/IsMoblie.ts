import BreakPoint from "./BreakPoint";

export const isMobile = () => {
    return window.innerWidth <= BreakPoint.mobile;
};
