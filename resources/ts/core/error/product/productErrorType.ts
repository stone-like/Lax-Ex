export type productErrorType = {
    category_id?: string[];
    name?: string[];
    price?: string[];
    weight?: string[];
    quantity?: string[];
    product_id?: string[];
};

// export type updateProductImageErrorType = {
//     imageContent?: string;
//     imageId?: string;
// };
// export type saveProductImageErrorType = {
//     productId?: string;
//     imageContent?: string;
// };
export type productImageErrorType = {
    imageContent?: string;
    image_id?: string;
    product_id?: string[];
};
