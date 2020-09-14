import axios from "axios";
import { PrefectureRepositoryInterface } from "./PrefectureRepositoryInterface";
import {
    prefectureFromBackEndType,
    prefectureType,
    prefectureEntityList
} from "./PrefectureType";
import { Prefecture } from "../../entity/Prefecture";
export class PrefectureLaravel implements PrefectureRepositoryInterface {
    async getAllPrefecture(): Promise<prefectureEntityList> {
        const prefectureList: prefectureFromBackEndType = await axios.get(
            "/api/prefectures"
        );
        const prefectureEntityList = prefectureList.data.map(
            (prefecture: prefectureType) => {
                return new Prefecture(prefecture.id, prefecture.name);
            }
        );

        return prefectureEntityList;
    }
}
