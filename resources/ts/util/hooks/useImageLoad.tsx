import React, { useState } from "react";

type Props = {
    expectImageCount: number;
};
export const useImageLoad = (props: Props) => {
    const { expectImageCount } = props;
    const [imageCount, setImageCount] = useState<number>(0);
    const isAllImageLoaded = () => {
        return imageCount === expectImageCount;
    };
    const setImageCountHandler = () => {
        console.log("handler active", imageCount);
        setImageCount(prev => prev + 1);
    };
    return { setImageCountHandler, isAllImageLoaded };
};
