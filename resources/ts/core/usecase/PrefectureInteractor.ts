import { PrefectureRepositoryInterface } from "../repository/prefecture/PrefectureRepositoryInterface";
import { prefectureEntityList } from "../repository/prefecture/PrefectureType";

export class PrefectureInteractor {
    private PrefectureRepository: PrefectureRepositoryInterface;

    constructor(PrefectureRepository: PrefectureRepositoryInterface) {
        this.PrefectureRepository = PrefectureRepository;
    }
    async getAllPrefecture(): Promise<prefectureEntityList> {
        const res = await this.PrefectureRepository.getAllPrefecture();

        return res;
    }
}
