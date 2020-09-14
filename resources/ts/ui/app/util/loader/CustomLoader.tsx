import React from "react";
import styled, { keyframes } from "styled-components";
import { Keyframes } from "react-spring/renderprops";
import Color from "../css/Color";

export const CustomLoader = () => {
    return (
        <LoadingContainer>
            <LoadingWrapper>
                <LoadingFlip />
            </LoadingWrapper>
        </LoadingContainer>
    );
};

const flip = keyframes`
  
  0%{
    transform: rotateX(0) rotateY(0)
    }
  20%, 25%{
    transform: rotateX(0) rotateY(720deg)
    }
  45%, 50%{
    transform: rotateX(720deg) rotateY(720deg)
    }
  70%, 75%{
    transform: rotateX(720deg) rotateY(0)
    }
  95%, 100%{
    transform: rotateX(0) rotateY(0)
    }
`;
const LoadingFlip = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: ${Color.mainBlack};
    margin: 0 auto;
    animation: ${flip} 8s infinite;
`;
const LoadingWrapper = styled.div`
    display: flex;
    width: 100%;
    min-height: 45%;
    align-items: center;
    vertical-align: middle;
`;

const LoadingContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
