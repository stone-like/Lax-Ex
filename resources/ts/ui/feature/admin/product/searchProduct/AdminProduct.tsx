import React from "react";
import { Product } from "../../../../../core/entity/Product";

//adminとuserで構造自体は同じなのでstyedComponentでstyleだけ切り替える手もある

type adminProductProps = {
    product: Product;
};
export const AdminProduct = (props: adminProductProps) => {
    const { product } = props;
    return <div>{product.name}</div>;
};
