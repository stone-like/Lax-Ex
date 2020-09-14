import React, { useState, Fragment } from "react";
import { Form, Image, Button } from "semantic-ui-react";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { imageObjType } from "./ImageType";
import { productImageErrorType } from "../../../../../core/error/product/productErrorType";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type adminCreateProductImage = {
    productId: number;
};
//大部分が似通っているのでupdateもcreateもgenericsで何とかなりそう
export const AdminCreateProductImage = (props: adminCreateProductImage) => {
    const { productId } = props;

    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);
    const [image, setImage] = useState<File>(null);
    const [imageSrc, setImageSrc] = useState<string>();
    const [errors, setErrors] = useState<productImageErrorType>();

    const history = useHistory();
    const proccessImageObjToFormData = () => {
        const formData = new FormData();
        formData.append("image_content", image);
        formData.append("product_id", productId.toString());
        return formData;
    };
    const ImageCraeteHandler = async () => {
        const formData = proccessImageObjToFormData();
        const res = await interactor.saveProductImage(formData);
        if (res.isFailure()) {
            //errorhandling
            setErrors(res.value);
        }
        console.log("created");
        return history.push("/admin/products");
    };

    const ChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files;
        const imgURL =
            imgFile.length === 0
                ? ""
                : URL.createObjectURL(imgFile[0]).toString();
        setImageSrc(imgURL);
        setImage(imgFile[0]);
    };

    const isButtonDisable = () => {
        return image === null ? true : false;
    };
    return (
        <CreateProductImageContainer>
            <CreateImageTitle>Create New Image</CreateImageTitle>
            <Form onSubmit={ImageCraeteHandler}>
                <Image src={imageSrc} size="small" />
                <Form.Input type="file" onChange={ChangeImageHandler} />
                {errors && errors.imageContent && (
                    <p>image error:{errors.imageContent}</p>
                )}
                {errors && errors.product_id && (
                    <p>product_id error:{errors.product_id}</p>
                )}
                <Button type="submit" disabled={isButtonDisable()}>
                    NewImageCreate
                </Button>
            </Form>
        </CreateProductImageContainer>
    );
};
const CreateProductImageContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const CreateImageTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
