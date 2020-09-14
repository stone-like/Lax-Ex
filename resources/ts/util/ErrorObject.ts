export type Result<T,E> = Success<T,E> | Failure<T,E>


//SuccessとFailureの構造が一緒だと、if(result.isFailure())みたいにして推論効かせようとしても構造が一緒→同じと解釈されて、結局推論が効かない、なのでどこか違うところをいれる
export class Success<T,E>{
    constructor(readonly value:T){}

    type = "success" as const//うまく推論を効かせるために必要

    isSuccess(): this is Success<T,E>{
        return true
    }
    isFailure(): this is Failure<T,E>{
        return false
    }
}

export class Failure<T,E>{
    constructor(readonly value:E){}

    type = "failure" as const//うまく推論を効かせるために必要

    isSuccess(): this is Success<T,E>{
        return false
    }
    isFailure(): this is Failure<T,E>{
        return true
    }
}