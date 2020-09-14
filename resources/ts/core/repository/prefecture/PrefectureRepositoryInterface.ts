import { prefectureEntityList } from "./PrefectureType";

export interface PrefectureRepositoryInterface {
    getAllPrefecture(): Promise<prefectureEntityList>;
}
