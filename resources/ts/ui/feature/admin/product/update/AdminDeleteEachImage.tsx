import React, { useState } from "react";
import { productImageType } from "../../../../../core/repository/product/ProductType";
import { Button, Checkbox } from "semantic-ui-react";

type adminDeleteEachImage = {
    imageId: number;
    setDeleteIds: React.Dispatch<React.SetStateAction<any[]>>;
    deleteIds: number[];
};

export const AdminDeleteEachImage = (props: adminDeleteEachImage) => {
    const { imageId, setDeleteIds, deleteIds } = props;
    const [checked, setChecked] = useState<boolean>(false);
    const AddDeleteIds = () => {
        const newIds = deleteIds.concat(imageId);
        setDeleteIds(newIds);
    };
    const RemoveFromDeleteIds = () => {
        const newIds = deleteIds.filter(id => {
            return imageId !== id;
        });
        setDeleteIds(newIds);
    };
    const ToggleCheckHandler = () => {
        setChecked(prevState => {
            !prevState === true ? AddDeleteIds() : RemoveFromDeleteIds();
            return !prevState;
        });
    };

    return (
        <div>
            <Checkbox
                label="delete this image"
                onChange={ToggleCheckHandler}
                checked={checked}
            />
        </div>
    );
};
