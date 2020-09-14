export class News {
    private _id: number;
    private _title: string;
    private _content: string;
    private _created_at: string;
    private _updated_at: string;

    constructor(
        id: number,
        title: string,
        content: string,
        created_at: string,
        updated_at: string
    ) {
        this._id = id;
        this._title = title;
        this._content = content;
        this._created_at = created_at;
        this._updated_at = updated_at;
    }

    get id(): number {
        return this._id;
    }
    get title(): string {
        return this._title;
    }
    get content(): string {
        return this._content;
    }
    get created_at(): string {
        return this._created_at;
    }
    get updated_at(): string {
        return this._updated_at;
    }
}
