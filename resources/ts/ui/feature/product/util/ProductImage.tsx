import React from "react";
import styled from "styled-components";

type Props = {
    imagePath: string;
};
export const ProductImage = (props: Props) => {
    const { imagePath } = props;
    return (
        <>
            <CustomImage src={imagePath} />
        </>
    );
};

const CustomImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
`;
