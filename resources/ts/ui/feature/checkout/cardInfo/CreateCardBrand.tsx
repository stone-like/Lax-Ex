import React from "react";
import { FaCcVisa, FaCcMastercard, FaCcJcb } from "react-icons/fa";
import { AiFillCreditCard } from "react-icons/ai";
type Props = {
    brand: string;
};
export const CreateCardBrand = (props: Props) => {
    const { brand } = props;
    const createCardBrandIcon = () => {
        switch (brand) {
            case "visa":
                return <FaCcVisa />;
            case "mastercard":
                return <FaCcMastercard />;
            case "jcb":
                return <FaCcJcb />;
            default:
                return <AiFillCreditCard />;
        }
        return;
    };
    return <>{createCardBrandIcon()}</>;
};
