import { useState } from "react";

export const useQuantity = (propsQuantity: number) => {
    const [quantity, setQuantity] = useState<number>(() => {
        return propsQuantity;
    });
    const isDisabled = () => {
        return quantity <= 1;
    };
    const incrementQuantityHandler = () => {
        setQuantity(prev => (prev += 1));
    };
    const decrementQuantityHandler = () => {
        if (quantity <= 1) {
            return;
        }
        setQuantity(prev => (prev -= 1));
    };

    return {
        quantity,
        isDisabled,
        incrementQuantityHandler,
        decrementQuantityHandler
    };
};
