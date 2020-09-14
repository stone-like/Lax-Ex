export type addressErrorType = {
    prefecture_id?: string[]; //想定していないエラーなのでerror.tsx行き
    address_id?: string[]; //想定していないエラーなのでerror.tsx行き
};
//address関係はloginしていないとだめだからauthenticateErrorも出るときがあるんだけど
//それをErrorPageに飛ばしてもいいものか悩む、一応想定し得るエラーではあるのでmodalとかが適当な気はするけど
//だとするとauthが関係するところは例えばaddressを例にとると、addressError+authErrorの二つを考えないといけなくなる(それぞれ対応が違うので)
