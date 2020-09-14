export type addressFormType =
    | "postCodeE"
    | "postCodeH"
    | "Prefecture"
    | "Address1"
    | "Address2"
    | "Name"
    | "PhoneNumber";

export type addrReturnType = {
    extended: string;
    locality: string;
    region: string;
    region_id: number;
    street: string;
};
