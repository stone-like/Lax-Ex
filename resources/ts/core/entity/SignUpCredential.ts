import { Email } from "./Email";

//もしかしたらクラスを分けなくてもPickをつかってSignInCredentialだけ取り出せばよかったかもしれないけど少しわかりにくそうだったので分けた
export class SignUpCredential{
    _email:Email;
    _password:string;
    _password_confirmation:string;
    _username:string;

    constructor(email:string,password:string,password_confirmation:string,username:string){
        this._password = password;
        this._password_confirmation = password_confirmation;
        this._email = new Email(email);
        this._username = username;
    }

    get email():string{
        return this._email.email;
    }

    get password():string{
        return this._password;
    }

    get password_confirmation():string{
        return this._password_confirmation;
    }

    get username():string{
        return this._username;
    }
}
//今回emailもcredentialもclassを作らなくてもいいんだけど、もしreact-hook-formをやめてEntity(それかValueObject)でvalidationを行う時のために一応
//でも、reactの影響がEntityに及ぶのは正直良くないので本当にしっかりやるんだったらreact-hook-formは使わない方がいいと思う