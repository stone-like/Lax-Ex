import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomLoader } from "../loader/CustomLoader";
import Color from "../css/Color";

type Props = {
    itemList: {
        title: string;
        src: string;
    }[];
    // height: number;
    autoChangeMilliTime: number;
    numOfParts: number;
    animTime: number;
    stagger: number;
    maxLetterStagger: number;
    letterStaggerTime: number;

    isAllImageLoaded: () => boolean;
    setImageCountHandler: () => void;
};

type SlideContainerProps = {
    isSlideLoaded: boolean;
};

type TopHeadingProps = {
    numOfParts: number;
    isSlideLoaded: boolean;
    animTime: number;
};

type SlideProps = {
    isCurrent: boolean;
};
type SlideContentProps = {
    numOfParts: number;
};
type SubHeadingProps = {
    isCurrent: boolean;
    animTime: number;
};
type HeadingProps = {
    isCurrent: boolean;
    isPrev: boolean;
    animTime: number;
    letterStaggerTime: number;
    maxLetterStagger: number;
};

type PartsProps = {
    numOfParts: number;
};
type PartProps = {
    numOfParts: number;
};
type PartInnerProps = {
    numOfParts: number;
    animTime: number;
    // backImageSrc: string;
    isCurrent: boolean;
    imageFadeAt: number;
    stagger: number;
};
type ArrowProps = {
    animTime: number;
    isSlideLoaded: boolean;
};

//s--readyはslideLoadedならつける、s--activeはcurrentSlideがmapのindexと同じならつける、
//s--prevはprevSlideがmapのindexと同じならつける
export const CustomSlider = (props: Props) => {
    const {
        itemList,
        autoChangeMilliTime,
        numOfParts,
        animTime,
        stagger,
        maxLetterStagger,
        letterStaggerTime,
        setImageCountHandler,
        isAllImageLoaded
    } = props;
    const [currentSlide, setCurrentSlide] = useState<number>(-1);
    const [prevSlide, setPrevSlide] = useState<number>(-1);
    const [isSlideLoaded, setIsSlideLoaded] = useState<boolean>(false);
    const [timeOutId, setTimeOutId] = useState<number>(null);

    const currentSlideNumberRef = useRef(currentSlide);
    currentSlideNumberRef.current = currentSlide;
    const prevSlideNumberRef = useRef(prevSlide);
    prevSlideNumberRef.current = prevSlide;
    const loadedRef = useRef(timeOutId);
    loadedRef.current = timeOutId;

    const imageFadeAt = animTime / 4;

    const initialSetting = async () => {
        runAutoChangeTo();
        setCurrentSlide(0);
        setIsSlideLoaded(true);
    };
    const runAutoChangeTo = () => {
        const returnTimeOutId = setTimeout(() => {
            //おそらく、この関数が起動した時のstateが取得されるっぽい、なのでinitialSettingのsetが終わった後動くようにしたい→useRefを使う

            changeSlides(1);
            runAutoChangeTo();
        }, autoChangeMilliTime);

        setTimeOutId(returnTimeOutId);
    };

    const returnAppropriateSlideNumber = (
        willChangeSlideNumber: number
    ): number => {
        if (willChangeSlideNumber < 0) {
            return itemList.length - 1;
        }
        if (willChangeSlideNumber >= itemList.length) {
            return 0;
        }
        return willChangeSlideNumber;
    };
    const changeSlides = (change: number) => {
        window.clearTimeout(timeOutId);
        //currentSlideが毎回-1スタートなのはなぜ？
        const nextPrevSlideNumber = currentSlideNumberRef.current;
        //ここでsetPrevをしていないのはPrevが反映されるまでにここから下の計算をしてしまう可能性があるため
        //setStateは反映が遅い
        const willChangeSlideNumber = nextPrevSlideNumber + change;
        const nextActiveSlideNumber = returnAppropriateSlideNumber(
            willChangeSlideNumber
        );

        setCurrentSlide(nextActiveSlideNumber);
        setPrevSlide(nextPrevSlideNumber);
    };
    useEffect(() => {
        initialSetting();
        return () => {
            window.clearTimeout(timeOutId);
        };
    }, []);

    const isCurrent = (index: number) => {
        return currentSlide === index;
    };
    const isPrev = (index: number) => {
        return prevSlide === index;
    };
    const dummyPartsArray = () => {
        return Array.from({ length: numOfParts }, (_, index) => index);
    };

    return (
        <SliderContainer>
            <SliderTopHeading
                numOfParts={numOfParts}
                animTime={animTime}
                isSlideLoaded={isSlideLoaded}
            >
                Lax
            </SliderTopHeading>
            <SliderContentContainer>
                {itemList.map((item, index) => (
                    <Slide isCurrent={isCurrent(index)} key={index}>
                        <SlideContent numOfParts={numOfParts}>
                            <SlideSubHeading
                                isCurrent={isCurrent(index)}
                                animTime={animTime}
                            >
                                For
                            </SlideSubHeading>
                            <SlideHeading
                                isCurrent={isCurrent(index)}
                                isPrev={isPrev(index)}
                                animTime={animTime}
                                letterStaggerTime={letterStaggerTime}
                                maxLetterStagger={maxLetterStagger}
                            >
                                {/* <span>{item.title}</span> */}
                                {item.title.split("").map(letter => (
                                    <span>{letter}</span>
                                ))}
                            </SlideHeading>
                        </SlideContent>
                        <SlideParts numOfParts={numOfParts}>
                            {dummyPartsArray().map((_, i) => (
                                <SlidePart key={i} numOfParts={numOfParts}>
                                    <SlidePartInner
                                        numOfParts={numOfParts}
                                        animTime={animTime}
                                        // backImageSrc={item.src}
                                        isCurrent={isCurrent(index)}
                                        imageFadeAt={imageFadeAt}
                                        stagger={stagger}
                                        style={{
                                            backgroundImage: `url(${item.src})`
                                        }}
                                    />
                                </SlidePart>
                            ))}
                        </SlideParts>
                    </Slide>
                ))}
            </SliderContentContainer>
            {/* <LeftArrow animTime={animTime} isSlideLoaded={isSlideLoaded} />
            <RightArrow animTime={animTime} isSlideLoaded={isSlideLoaded} /> */}
        </SliderContainer>
    );
};

const SliderContainer = styled.div`
    overflow: hidden;
    position: relative;
    height: 100%;
    color: #fff;
`;
const SliderTopHeading = styled.p`
    z-index: ${(props: TopHeadingProps) => {
        return props.numOfParts * 3;
    }};
    position: absolute;
    left: 0;
    top: 100px;
    width: 100%;
    text-align: center;
    font-size: 5.5rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    transition: ${(props: TopHeadingProps) => {
        return `all ${props.animTime / 2}s ${props.animTime}s`;
    }};
    transform: ${(props: TopHeadingProps) => {
        return props.isSlideLoaded ? "translateY(0)" : "translateY(-30px)";
    }};
    opacity: ${(props: TopHeadingProps) => {
        return props.isSlideLoaded ? 1 : 0;
    }};
`;
const SliderContentContainer = styled.div`
    position: relative;
    height: 100%;
`;
const Slide = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: ${(props: SlideProps) => {
        return props.isCurrent ? "auto" : "none";
    }};
`;
const SlideContent = styled.div`
    z-index: ${(props: SlideContentProps) => {
        return props.numOfParts + 2;
    }};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    text-transform: uppercase;
    line-height: 1;
`;
const SlideSubHeading = styled.h3`
    margin-bottom: 20px;
    font-size: 24px;
    letter-spacing: 2px;
    transform: ${(props: SubHeadingProps) => {
        return props.isCurrent ? "translateY(0)" : "translateY(20px)";
    }};
    opacity: ${(props: SubHeadingProps) => {
        return props.isCurrent ? 1 : 0;
    }};
    transition: ${(props: SubHeadingProps) => {
        return `${props.animTime / 2}s`;
    }};
    transition-delay: ${(props: SubHeadingProps) => {
        return props.isCurrent ? `${props.animTime * 0.65}s` : "0s";
    }};
`;

const HeadingFontSize = 60;
const createHeadingTransform = (props: HeadingProps) => {
    if (props.isCurrent) {
        return "translateY(0)";
    }
    if (props.isPrev) {
        return `translateY(${HeadingFontSize}px)`;
    }

    return `translateY(${HeadingFontSize * -1}px)`;
};

const createCssTransition = (
    i: number,
    letterStaggerTime: number,
    animTime: number,
    isCurrent: boolean
) => {
    const delay = letterStaggerTime * (i - 1);
    const transitionDelay = isCurrent ? delay + animTime / 3 : delay;
    return `
    &:nth-child(${i}) {
      transition-delay: ${transitionDelay}s;
     }
  `;
};

const createFirstToLastTransitionDelay = (
    maxLetterStagger: number,
    letterStaggerTime: number,
    animTime: number,
    isCurrent: boolean
) => {
    let styles = "";
    for (let index = 1; index <= maxLetterStagger; index += 1) {
        styles += createCssTransition(
            index,
            letterStaggerTime,
            animTime,
            isCurrent
        );
    }
    // return css`
    //     ${styles}
    // `;
    return styles;
};
const createMaxLetterStaggerPlusOneToLastTransitionDelay = (
    maxLetterStagger: number,
    letterStaggerTime: number,
    animTime: number,
    isCurrent: boolean
) => {
    const delay = letterStaggerTime * maxLetterStagger;
    const transitionDelay = isCurrent ? delay + animTime / 3 : delay;
    return `
    &:nth-child(n+${maxLetterStagger + 1}) {
      transition-delay: ${transitionDelay}s;
     }
  `;
};
const SlideHeading = styled.h2`
    font-size: ${() => {
        return `${HeadingFontSize}px`;
    }};
    display: flex;
    margin-bottom: 20px;
    letter-spacing: 12px;

    span {
        display: block;
        opacity: ${(props: HeadingProps) => {
            return props.isCurrent ? 1 : 0;
        }};
        transform: ${(props: HeadingProps) => {
            return createHeadingTransform(props);
        }};
        transition: ${(props: HeadingProps) => {
            return `all ${props.animTime / 3}s`;
        }};

        ${(props: HeadingProps) => {
            return createFirstToLastTransitionDelay(
                props.maxLetterStagger,
                props.letterStaggerTime,
                props.animTime,
                props.isCurrent
            );
        }}
        ${(props: HeadingProps) => {
            return createMaxLetterStaggerPlusOneToLastTransitionDelay(
                props.maxLetterStagger,
                props.letterStaggerTime,
                props.animTime,
                props.isCurrent
            );
        }}
    }
`;

const SlideParts = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    width: 100%;
    height: 100%;

    &:after {
        content: "";
        z-index: ${(props: PartProps) => {
            return props.numOfParts + 1;
        }};
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        /* background: rgba(0, 0, 0, 0.1); */
        background: transparent;
    }
`;

const SlidePart = styled.div`
    position: relative;
    width: ${(props: PartProps) => {
        //     return `percentage(${1 / props.numOfParts})`;
        return `${100 / props.numOfParts}%`;
    }};
    height: 100%;
`;

// const returnCalc = (numOfParts: number, index: number) => {
//     return ``calc(100vw / ${numOfParts} * -1 * ${index} - 1)``;
// };

const createBeforeCss = (numOfParts: number, index: number) => {
    // calc(100vw / ${numOfParts} * -1 * ${index} - 1)
    return "calc(100vw / " + numOfParts + " * -1 * " + "(" + index + " - 1) )";
};
const createCssPartChildToInner = (
    i: number,
    stagger: number,
    animTime: number,
    numOfParts: number,
    // partWidth: number,
    imageFadeAt: number,
    isCurrent: boolean
) => {
    const delayOut = (numOfParts - i) * stagger;
    const delayIn = i * stagger + animTime / 5;
    const delay = isCurrent ? delayIn : delayOut;

    // const left = partWidth * (i - 1) * -1;
    const transitionDelay = isCurrent ? delayIn : delayOut + imageFadeAt / 2;

    const transformPercent = (i / numOfParts) * -1.3 * 100;
    return `
        ${SlidePart}:nth-child(${i}) & {
            z-index: ${numOfParts - i};
            transition-delay: ${delay}s;
            transform:translateX(${transformPercent}%);

            &:before {
                left: ${createBeforeCss(numOfParts, i)};
                transition-delay: ${transitionDelay}s;
                
              }
         }
      `;
};
const createPartChildToInner = (
    numOfParts: number,
    stagger: number,
    animTime: number,
    isCurrent: boolean,
    imageFadeAt: number
) => {
    // const partWidth = 100 / numOfParts;

    let styles = "";
    for (let index = 1; index <= numOfParts; index += 1) {
        styles += createCssPartChildToInner(
            index,
            stagger,
            animTime,
            numOfParts,
            // partWidth,
            imageFadeAt,
            isCurrent
        );
    }
    // return css`
    //     ${styles}
    // `;
    return styles;
};

const SlidePartInner = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 0 0;
    background-repeat: no-repeat;
    transition: ${(props: PartInnerProps) => {
        return `transform ${props.animTime / 2}s ease-in-out`;
    }};
    transform: ${(props: PartInnerProps) => {
        return props.isCurrent && `translateX(0) !important`;
    }};
    transition-timing-function: ${(props: PartInnerProps) => {
        return props.isCurrent && `ease !important`;
    }};

    &::before {
        content: "";
        position: absolute;
        width: 100vw;
        height: 100%;
        background-image: inherit;

        background-size: cover;
        background-position: center center;

        transition: ${(props: PartInnerProps) => {
            return `opacity ${props.imageFadeAt}s`;
        }};
        opacity: ${(props: PartInnerProps) => {
            return props.isCurrent ? 1 : 0;
        }};
    }

    ${(props: PartInnerProps) => {
        return createPartChildToInner(
            props.numOfParts,
            props.stagger,
            props.animTime,
            props.isCurrent,
            props.imageFadeAt
        );
    }}
`;

const size = 50;
const LeftArrow = styled.div`
    z-index: 100;
    position: absolute;
    left: 50px;
    top: 50%;
    width: ${() => {
        return `${size}px`;
    }};
    height: ${() => {
        return `${size}px`;
    }};
    margin-top: ${() => {
        return `${size / -2}px`;
    }};
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: ${(props: ArrowProps) => {
        return props.isSlideLoaded
            ? `translateX(0)`
            : `translateX(${size * -1}px)`;
    }};
    opacity: ${(props: ArrowProps) => {
        return props.isSlideLoaded ? 1 : 0;
    }};
    transition: ${(props: ArrowProps) => {
        return `all ${props.animTime / 2}s ${props.animTime}s`;
    }};
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid #000;
        border-bottom: none;
        border-right: none;
        transform: translateX(5px) rotate(-45deg);
    }
`;
const RightArrow = styled.div`
    z-index: 100;
    position: absolute;
    left: auto;
    right: 50px;
    top: 50%;
    width: ${() => {
        return `${size}px`;
    }};
    height: ${() => {
        return `${size}px`;
    }};
    margin-top: ${() => {
        return `${size / -2}px`;
    }};
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: ${(props: ArrowProps) => {
        return props.isSlideLoaded ? `translateX(0)` : `translateX(${size}px)`;
    }};
    opacity: ${(props: ArrowProps) => {
        return props.isSlideLoaded ? 1 : 0;
    }};
    transition: ${(props: ArrowProps) => {
        return `all ${props.animTime / 2}s ${props.animTime}s`;
    }};
    cursor: pointer;

    &:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid #000;
        border-bottom: none;
        border-right: none;
        transform: translateX(-5px) rotate(135deg);
    }
`;
