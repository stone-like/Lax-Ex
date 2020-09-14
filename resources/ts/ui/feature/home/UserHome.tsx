import React from "react";
import { homeGalleryList } from "./homeGalleryList";
import { CustomSlider } from "../../app/util/slider/CustomSlider";
import styled from "styled-components";
import Color from "../../app/util/css/Color";
import { useImageLoad } from "../../../util/hooks/useImageLoad";
import { NewsComponent } from "./news/NewsComponent";
import { RecommendProduct } from "./recommendProduct/recommendProduct";
export const UserHome = () => {
    const { isAllImageLoaded, setImageCountHandler } = useImageLoad({
        expectImageCount: homeGalleryList.length
    });

    return (
        <HomeContainer>
            <SliderWrapper>
                <CustomSlider
                    itemList={homeGalleryList}
                    autoChangeMilliTime={4000}
                    numOfParts={16}
                    animTime={1}
                    stagger={0.08}
                    maxLetterStagger={6}
                    letterStaggerTime={0.1}
                    isAllImageLoaded={isAllImageLoaded}
                    setImageCountHandler={setImageCountHandler}
                />
            </SliderWrapper>
            <NewsComponent />
            <RecommendProduct />
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    width: 100%;
    /* display: flex;
    flex-direction: column; */
`;
const SliderWrapper = styled.div`
    width: 100%;
    height: 80vh;
`;
