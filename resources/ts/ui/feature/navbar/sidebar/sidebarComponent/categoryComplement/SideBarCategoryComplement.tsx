import React, { useRef, Fragment } from "react";
import styled from "styled-components";
import Zindex from "../../../../../app/util/css/Zindex";
import { ReactSpringHook, useSpring, animated } from "react-spring";
import { categoryEntityListType } from "../../../../../../core/repository/category/CategoryType";
import { CategoryMenu } from "./CategoryMenu";
import Color from "../../../../../app/util/css/Color";

type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    categoryList: categoryEntityListType;
};
export const SideBarCategoryComplement = (props: Props) => {
    const { isOpen, setIsOpen, categoryList } = props;
    //animation

    const navProps = useSpring({
        from: { transform: "translateX(0%)" },
        to: { transform: isOpen ? "translateX(100%)" : "translateX(0%)" },
        config: { duration: 200 }
    });

    return (
        <ComplementContainer
            style={navProps}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <CategoryMenu categoryList={categoryList} />
        </ComplementContainer>
    );
};

const ComplementContainer = styled(animated.div)`
    z-index: ${Zindex.complement};
    position: fixed;
    width: calc(20% - 2px);
    /* sidebarのborder-left　1pxの分 */
    height: 100%;
    background-color: ${Color.mainWhite};
    /* transition: all 0.4s ease-in-out; */

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    /* padding: 2rem; */
    align-items: flex-start;

    transform: translateX(100%);

    padding: 20rem 3.5rem;

    border-right: 2px solid ${Color.sidebarBorder};
`;
