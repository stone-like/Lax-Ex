import React, { useState, useRef } from "react";
import { productImageType } from "../../../../../core/repository/product/ProductType";
import { Image, Input, Button, Checkbox, Form, Grid } from "semantic-ui-react";
import { imageObjListType } from "./ImageType";
import { AdminDeleteEachImage } from "./AdminDeleteEachImage";
import styled from "styled-components";

type adminEachImageType = {
    imageObj: productImageType;
    setImageObjList: React.Dispatch<React.SetStateAction<imageObjListType>>;
    imageObjList: imageObjListType;
    setDeleteIds: React.Dispatch<React.SetStateAction<any[]>>;
    deleteIds: number[];
};

export const AdminEachImage = (props: adminEachImageType) => {
    const {
        imageObj,
        setImageObjList,
        imageObjList,
        setDeleteIds,
        deleteIds
    } = props;
    const [imageSrc, setImageSrc] = useState(imageObj.image);
    const [isUpdateImageSet, setUpdateImageBool] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const changeImageObjList = (imageId: number, newFile: File) => {
        const filteredImageObjList = imageObjList.filter(imageObj => {
            return imageId !== imageObj.id;
        });
        const newList = filteredImageObjList.concat({
            id: imageId,
            image: newFile
        }); //別にpushでもいいけど

        setImageObjList(newList);
    };
    const removeFromImageObjList = (imageId: number) => {
        const filteredImageObjList = imageObjList.filter(imageObj => {
            return imageId !== imageObj.id;
        });
        setImageObjList(filteredImageObjList);
    };

    //ここらへんバグが生まれそうで怖い、スッキリかけないってことは理解不足なのでバグが生まれやすい
    const ChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files;
        const imgURL =
            imgFile.length === 0
                ? ""
                : URL.createObjectURL(imgFile[0]).toString();
        setImageSrc(imgURL);

        changeImageObjList(imageObj.id, imgFile[0]);
        setUpdateImageBool(true);
    };

    //toDo:おそらくuseMemo等使った方がいい
    const CancelImagehandler = () => {
        //srcイメージをもとに戻す
        setImageSrc(imageObj.image);
        //update予定のリストから除外
        removeFromImageObjList(imageObj.id);
        //updateImageがsetされていない判定にする
        setUpdateImageBool(false);
        //input自体のvalueを""にして初期化する
        inputRef.current.value = "";
    };

    return (
        <Grid.Column mobile={16} tablet={8} computer={4}>
            <CustomImage src={imageSrc} />
            <input type="file" onChange={ChangeImageHandler} ref={inputRef} />
            <Button onClick={CancelImagehandler} disabled={!isUpdateImageSet}>
                Cancel
            </Button>
            <AdminDeleteEachImage
                imageId={imageObj.id}
                deleteIds={deleteIds}
                setDeleteIds={setDeleteIds}
            />
        </Grid.Column>
    );
};

const CustomImage = styled.img`
    width: 200px;
    height: 200px;
    object-fit: cover;
`;
