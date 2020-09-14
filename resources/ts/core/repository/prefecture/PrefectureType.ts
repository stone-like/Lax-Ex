import { Prefecture } from "../../entity/Prefecture";

export type prefectureFromBackEndType = {
    data: prefectureType[];
};

export type prefectureType = {
    id: number;
    name: string;
};

export type prefectureEntityList = Prefecture[];
