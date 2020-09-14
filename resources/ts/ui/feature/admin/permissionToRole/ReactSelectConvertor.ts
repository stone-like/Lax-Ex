type eachSelectType = {
    label: string;
    value: number;
};

export const extractIdsFromSelectData = (
    selectList: eachSelectType[]
): number[] => {
    const IdList = selectList.map(eachSelect => {
        return eachSelect.value;
    });
    return IdList;
};
