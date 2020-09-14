export class Address {
    private _id: number;
    private _zip: string;
    private _address1: string;
    private _address2: string;
    private _phoneNumber: string;
    private _userName: string;
    private _prefectureName: string; //backendではnumberだけど、フロントではstringなのでbackendから貰うタイミングで変換

    constructor(
        id: number,
        zip: string,
        address1: string,
        userName: string,
        prefectureName: string,
        address2: string = "",
        phoneNumber: string = ""
    ) {
        this._id = id;
        this._zip = zip;
        this._address1 = address1;
        this._address2 = address2;
        this._phoneNumber = phoneNumber;
        this._prefectureName = prefectureName;
        this._userName = userName;
    }

    get id(): number {
        return this._id;
    }

    get zip(): string {
        return this._zip;
    }
    get address1(): string {
        return this._address1;
    }
    get address2(): string {
        return this._address2;
    }
    get phoneNumber(): string {
        return this._phoneNumber;
    }
    get prefectureName(): string {
        return this._prefectureName;
    }
    get userName(): string {
        return this._userName;
    }
}
