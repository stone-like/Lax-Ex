import { Email } from "./Email";

//もしかしたらクラスを分けなくてもPickをつかってSignInCredentialだけ取り出せばよかったかもしれないけど少しわかりにくそうだったので分けた
export class SignInCredential{
    _email:Email;
    _password:string;

    constructor(email:string,password:string){
        this._password = password;
        
        this._email = new Email(email);
 
    }

    get email():string{
        return this._email.email;
    }

    get password():string{
        return this._password;
    }

}
