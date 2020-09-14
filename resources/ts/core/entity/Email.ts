export class Email{
    email:string;

    constructor(email:string){
            this.email = email;
    }
}
//今回emailもcredentialもclassを作らなくてもいいんだけど、もしreact-hook-formをやめてEntity(それかValueObject)でvalidationを行う時のために一応
//でも、reactの影響がEntityに及ぶのは正直良くないので本当にしっかりやるんだったらreact-hook-formは使わない方がいいと思う