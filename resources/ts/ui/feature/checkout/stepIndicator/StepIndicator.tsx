import React from "react";
import styled from "styled-components";
import Color from "../../../app/util/css/Color";

type Props = {
    stepArray: {
        title1: string;
        title2: string;
        title3: string;
    }[];
    arrayLength: number;
    currentStep: number;
};
type stepperProps = {
    arrayLength?: number;
    isCurrent: boolean;
};
export const StepIndicator = (props: Props) => {
    const { stepArray, currentStep, arrayLength } = props;

    const isCurrent = (index: number) => {
        return index + 1 === currentStep;
    };
    return (
        <IndicatorContainer>
            <StepperContainer>
                {stepArray.map((step, index) => {
                    return (
                        <StepperWrapper key={index}>
                            <StepperNumber isCurrent={isCurrent(index)}>
                                {index + 1}
                            </StepperNumber>
                            <StepperDescription>
                                <StepperDescriptionTitle
                                    isCurrent={isCurrent(index)}
                                >
                                    {step.title1}
                                </StepperDescriptionTitle>
                                <StepperDescriptionTitle
                                    isCurrent={isCurrent(index)}
                                >
                                    {step.title2}
                                </StepperDescriptionTitle>
                                <StepperDescriptionTitle
                                    isCurrent={isCurrent(index)}
                                >
                                    {step.title3}
                                </StepperDescriptionTitle>
                            </StepperDescription>
                            {index + 1 !== arrayLength && (
                                <StepperDivider
                                    arrayLength={arrayLength}
                                    isCurrent={isCurrent(index)}
                                />
                            )}
                        </StepperWrapper>
                    );
                })}
            </StepperContainer>
        </IndicatorContainer>
    );
};

const IndicatorContainer = styled.div`
    width: 100%;
    padding: 1rem;
    margin-bottom: 5rem;
    display: flex;
`;
const StepperContainer = styled.div`
    width: 50%;
    display: flex;
    margin-left: auto;
    justify-content: space-between;
`;
const StepperWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 23%;
    position: relative;
`;
const StepperNumber = styled.div`
    border-radius: 80%;
    background-color: ${(props: stepperProps) => {
        return props.isCurrent ? Color.stepperActive : Color.stepperNormal;
    }};
    color: white;
    width: 25px;
    height: 25px;
    padding: 3px;
    margin-bottom: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StepperDescription = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const StepperDescriptionTitle = styled.div`
    font-weight: ${(props: stepperProps) => {
        return props.isCurrent ? 900 : 400;
    }};
    color: ${(props: stepperProps) => {
        return props.isCurrent ? "black" : Color.sidebarBlack;
    }};
`;
const StepperDivider = styled.div`
    height: 1px;
    background-color: ${(props: stepperProps) => {
        return props.isCurrent ? Color.stepperActive : Color.stepperNormal;
    }};
    position: absolute;
    top: 13%;
    left: 70%;

    width: ${(props: stepperProps) => {
        switch (props.arrayLength) {
            case 2:
                return "296%";
            case 3:
                return "125%";
            case 4:
                return "70%";
            case 5:
                return "60%";
        }
    }};
`;
