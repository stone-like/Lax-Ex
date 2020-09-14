import React, { useRef } from "react";
import { Product } from "../../../../../core/entity/Product";
import styled from "styled-components";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    Image
} from "pure-react-carousel";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Color from "../../../../app/util/css/Color";
type productImageProps = {
    product: Product;
};
export const ProductImage = (props: productImageProps) => {
    const { product } = props;
    return (
        <ImageContainer>
            <CustomImage
                src={product.images[0].image}
                width="500"
                height="840"
            />
            {/* <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={product.images.length}
            >
                <Slider>
                    {product.images.map((imageObj, index) => (
                        <Slide index={index} key={index}>
                            <Image
                                src={imageObj.image}
                                hasMasterSpinner={true}
                            />
                        </Slide>
                    ))}
                </Slider>
                <ButtonContainer>
                    <CustomButtonBack disabled={null}>
                        <IoIosArrowBack />
                    </CustomButtonBack>
                    <CustomButtonNext disabled={null}>
                        <IoIosArrowForward />
                    </CustomButtonNext>
                </ButtonContainer>
            </CarouselProvider> */}
        </ImageContainer>
    );
};

const ImageContainer = styled.div`
    height: 100%;
    width: 100%;
    /* position: relative;
    display: flex;
    justify-content: center; */
`;
const CustomImage = styled.img`
    height: auto;
    width: 100%;

    /* height: auto; */
    display: block;
    /* min-height: 400px; */
    /* max-width: 100%; */
`;
const ButtonContainer = styled.div`
    display: flex;
`;
const CustomButtonBack = styled(ButtonBack)`
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: ${Color.mainBlack};

    &:hover {
        color: ${Color.focusBlack};
    }

    border: none;
    background-color: transparent;

    margin-left: auto;
`;
const CustomButtonNext = styled(ButtonNext)`
    font-size: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    color: ${Color.mainBlack};

    &:hover {
        color: ${Color.focusBlack};
    }
    border: none;
    background-color: transparent;
`;
