export type pagePayloadType = {
    page: string;
};

export type setActivePageType = {
    type: "SETACTIVEPAGE";
    payload: pagePayloadType;
};
export const serActivePage = (page: string): setActivePageType => ({
    type: "SETACTIVEPAGE",
    payload: { page }
});
export type allPageActionType = setActivePageType;
