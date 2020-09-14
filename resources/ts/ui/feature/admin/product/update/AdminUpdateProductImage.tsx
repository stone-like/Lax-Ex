import React, { Fragment, useState } from "react";
import { productImageListType } from "../../../../../core/repository/product/ProductType";
import { Image, Button, Input, Form, Grid } from "semantic-ui-react";
import { AdminEachImage } from "./AdminEachImage";
import { imageObjListType, imageObjType } from "./ImageType";
import { productImageErrorType } from "../../../../../core/error/product/productErrorType";
import { ProductLaravel } from "../../../../../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../../../../../core/usecase/ProductInteractor";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

type adminUpdateProductImageProps = {
    productImages: productImageListType;
};
export const AdminUpdateProductImage = (
    props: adminUpdateProductImageProps
) => {
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const { productImages } = props;
    const [imageObjList, setImageObjList] = useState<imageObjListType>([]);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);

    const [errors, setErrors] = useState<productImageErrorType>();
    const history = useHistory();
    const proccessImageObjListToFormData = () => {
        const formData = new FormData();
        imageObjList.forEach(imageObj => {
            formData.append("image_contents[]", imageObj.image);
            formData.append("image_ids[]", imageObj.id.toString());
        });
        return formData;
    };
    const ImageUpdateHandler = async () => {
        const formData = proccessImageObjListToFormData();
        const res = await interactor.updateProductImage(formData);

        if (res.isFailure()) {
            //errorhandling
            setErrors(res.value);
        }
        //成功時は何もしない、messageを表示してもいいかもしれない
        return history.push("/admin/products");
    };
    const ImageDeleteHandler = async () => {
        //これはimage自体を送るわけではないで、formDataで無くて良い、楽
        const res = await interactor.deleteProductImage(deleteIds);

        if (res.isFailure()) {
            setErrors(res.value);
        }

        return history.push("/admin/products");
    };

    const isDeleteButtonDisabled = () => {
        return deleteIds.length === 0 ? true : false;
    };
    const isUpdateButtonDisabled = () => {
        return imageObjList.length === 0 ? true : false;
    };
    return (
        <UpdateProductImageContainer>
            <UpdateProductImageTitle>
                UpdateAndDeletePeoductImage
            </UpdateProductImageTitle>
            <Form>
                <Grid>
                    {productImages.map(imageObj => {
                        return (
                            <AdminEachImage
                                imageObj={imageObj}
                                setImageObjList={setImageObjList}
                                imageObjList={imageObjList}
                                deleteIds={deleteIds}
                                setDeleteIds={setDeleteIds}
                            />
                        );
                    })}
                    {errors && errors.imageContent && (
                        <p>image error:{errors.imageContent}</p>
                    )}
                    {errors && errors.image_id && (
                        <p>image_id error:{errors.image_id}</p>
                    )}
                </Grid>

                <UpdateAndDeleteButtonContainer>
                    <CustomUpdateButton
                        type="submit"
                        disabled={isUpdateButtonDisabled()}
                        onClick={ImageUpdateHandler}
                    >
                        ImageUpdate
                    </CustomUpdateButton>
                    <CustomDeleteButton
                        onClick={ImageDeleteHandler}
                        disabled={isDeleteButtonDisabled()}
                    >
                        Delete SelectedImages
                    </CustomDeleteButton>
                </UpdateAndDeleteButtonContainer>
            </Form>
        </UpdateProductImageContainer>
    );
};

const UpdateProductImageContainer = styled.div`
    padding: 2rem;
    margin-bottom: 2rem;
`;
const UpdateProductImageTitle = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
`;
const UpdateAndDeleteButtonContainer = styled.div`
    display: flex;
    margin-top: 3rem;
    align-items: flex-end;
`;

const CustomUpdateButton = styled(Button)``;
const CustomDeleteButton = styled(Button)`
    margin-left: 4rem;
`;
