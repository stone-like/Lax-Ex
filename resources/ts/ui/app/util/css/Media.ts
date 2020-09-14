import { generateMedia } from "styled-media-query";
import BreakPoint from "./BreakPoint";

export const customMedia = generateMedia({
    breakpoint: `${BreakPoint.mobile}px`,
    imageNone: `${BreakPoint.imageNone}px`
});
