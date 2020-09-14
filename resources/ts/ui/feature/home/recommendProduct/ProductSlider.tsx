import React from "react";
import { productEntityListType } from "../../../../core/repository/product/ProductType";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from "../../product/search/ProductCard";
import styled from "styled-components";
import { PrevArrow } from "./PrevArrow";
import { NextArrow } from "./NextArrow";

type Props = {
    productList: productEntityListType;
};

export const ProductSlider = (props: Props) => {
    const { productList } = props;

    const settings = {
        dot: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1030,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    return (
        <SliderContainer>
            <FlexSlider {...settings}>
                {productList.map(product => (
                    <CardContainer key={product.id}>
                        <ProductCard product={product} />
                    </CardContainer>
                ))}
            </FlexSlider>
            {/* <Slider {...settings}>
                {productList.map(product => (
                    <CardContainer key={product.id}>
                        <ProductCard product={product} />
                    </CardContainer>
                ))}
            </Slider> */}
        </SliderContainer>
    );
};

const FlexSlider = styled(Slider)`
    display: flex !important;
`;

const SliderContainer = styled.div`
    width: 100%;
    margin-top: 5rem;
    /* min-height: 70rem; */
`;

//mediaによってpaddingをいじる
//1493pxでまずいじる
const CardContainer = styled.div`
    width: 85%;
    /* height: 90%; */
    padding: 2rem 2rem;
`;
