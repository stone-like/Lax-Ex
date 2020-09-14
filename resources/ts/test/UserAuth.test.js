// import {server,rest} from "./testServer"
import React from "react";
import { Provider, useDispatch } from "react-redux";
import { SignUpUser } from "../ui/feature/auth/UserSignUp";
import { cleanup, render, fireEvent, findByText } from "@testing-library/react";
import { configureStore } from "../ui/store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";
import { server, rest } from "./testServer";
import { SignUpInteractor } from "../core/usecase/SignUpInteractor";
import { SignInInteractor } from "../core/usecase/SignInInteractor";
import { LogoutInteractor } from "../core/usecase/LogoutInteractor";
import { User } from "../core/entity/User";
import {
    UserReducer,
    initialState as UserInitial
} from "../ui/feature/auth/redux/UserReducer";
import { SignUpLaravel } from "../core/repository/signUp/SignUpLaravel";
import { createStore } from "redux";
import rootReducer from "../ui/reducer/reducer";
import { SignInCredential } from "../core/entity/SignInCredential";
import { Admin } from "../core/entity/Admin";
import { AdminContainer } from "../ui/feature/admin/container/AdminContainer";

afterEach(cleanup);

// it("error when invalid input sent", async () => {
//     //一応mockしてるのでfront側から実際帰ってくるmessageと違っても良いといえば良いんだけどすり合わせた方がいいと思う
//     server.use(
//         rest.post("/api/register", (_req, res, ctx) => {
//             return res(
//                 ctx.status(422),
//                 ctx.json({
//                     errors: {
//                         password: [
//                             "The password must be at least 6 characters."
//                         ]
//                     }
//                 })
//             );
//         })
//     );

//     const { store } = configureStore();
//     const { getByLabelText, getByText, findByText } = render(
//         <Provider store={store}>
//             <SignUpUser />
//         </Provider>
//     );
//     const password = getByLabelText("password:");
//     const password_confirmation = getByLabelText("password_confirmation:");
//     const button = getByText("Submit"); //getByRoleでもいいけど

//     fireEvent.change(password, { target: { value: "afa" } });
//     fireEvent.change(password_confirmation, { target: { value: "bbb" } });
//     fireEvent.click(button);

//     expect(await findByText(/The password must/i)).toBeInTheDocument();
// });

//多分ui層からreduxのstateをtestするのは向いていない、fireevent.clickをawaitで待ってstateを確かめることができない
//そもそもui層のtestの意図は何らかのeventを起こす→uiが増えたり減ったり何らかの変化を起こすのを見るためなので、reduxのstate変化はuiの操作由来ではなく、例えばmockしたreducerのみのtestなりでやる方がいい

//やるとすればawaitで待てるusecase層から(例としてawait interactor.signUpUser(new Credential());)のtestなんだけど、これはusecase層のtestでは書けないはず(reduxの知識等が流出してしまう)、なのでtestを書く場所としては多分ここでもいい?
//クリック由来はダメなので、ちょうどviewから使いやすいところだけ抜き出してtestする形になる？
// it("set user when successful input", async () => {
//     //結局mockServerから値を受け取って、reducerの働きをtestするという流れ
//     const repository = new SignUpLaravel();
//     const interactor = new SignUpInteractor(repository);
//     const res = await interactor.signUpUser(
//         "test@email.com",
//         "secret",
//         "secret",
//         "test"
//     );
//     if (res.isFailure()) {
//         //error処理
//         errorHandler(res.value);
//         return;
//     }

//     const user = UserReducer(UserInitial, {
//         type: "SETUSER",
//         payload: {
//             user: res.value
//         }
//     });
//     expect(user.user.name).toEqual("test");
// });

// it("signUpAdmin is restricted By CreateAdmin Permission", () => {
//     //testすることはcreateAdminPermissionを持っていなかったらadminhomeにredirectすること
//     const store = createStore(rootReducer, {
//         admin: {
//             admin: new Admin("test@email.com", test, [], "", true)
//         }
//     });
//     const { getByLabelText, getByText, findByText } = render(
//         <Provider store={store}>
//             <Router>
//                 <AdminContainer />
//             </Router>
//         </Provider>
//     );
//     const link = getByText(/register/i);
//     fireEvent.click(link); //adminHomeへのredirectが希望
//     expect(getByText(/AdminHome/i)).toBeInTheDocument();
// });
// it("successfully page in signUpAdmin when admin has CreateAdmin Permission", () => {
//     //testすることはcreateAdminPermissionを持っているときしっかりとsignUpAdminページに到達できること
//     const store = createStore(rootReducer, {
//         admin: {
//             admin: new Admin(1, "test@email.com", test, ["createAdmin"], true)
//         }
//     });
//     const { getByLabelText, getByText, findByText } = render(
//         <Provider store={store}>
//             <Router>
//                 <AdminContainer />
//             </Router>
//         </Provider>
//     );

//     const link = getByText(/register/i);
//     fireEvent.click(link);
//     expect(getByLabelText(/name/i)).toBeInTheDocument();
// });

// it("undefined is displayed when admin is not assigned role", async () => {
//     server.use(
//         rest.post("/api/admin/login", (_req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.json({
//                     name: "test",
//                     email: "test@email.com",
//                     permissions: [],
//                     role: "undefined"
//                 })
//             );
//         })
//     );

//     const store = createStore(rootReducer, {
//         admin: {
//             admin: new Admin(null, "", "", [], "", false)
//         }
//     });
//     //パーツごとに分けてtestした方が良さそうだけど、今回の要件は全体を描画しないと達成できなさそうなので仕方なく・・・
//     const { getByLabelText, getByText, findByText } = render(
//         <Provider store={store}>
//             <Router>
//                 <AdminContainer />
//             </Router>
//         </Provider>
//     );

//     const link = getByText(/login/i);
//     fireEvent.click(link);

//     const email = getByLabelText(/email:/i);
//     const password = getByLabelText(/password:/i);
//     const button = getByText(/submit/i);
//     fireEvent.change(email, { target: { value: "test@email.com" } });
//     fireEvent.change(password, { target: { value: "password" } });
//     fireEvent.click(button);

//     expect(await findByText(/undefined/i)).toBeInTheDocument();
// });

// it("successfully logout", async () => {
//     server.use(
//         rest.post("/api/admin/logout", (_req, res, ctx) => {
//             return res(ctx.status(200));
//         })
//     );

//     const store = createStore(rootReducer, {
//         admin: {
//             admin: new Admin(1, "test@email.com", "test", "", [], true)
//         }
//     });
//     //パーツごとに分けてtestした方が良さそうだけど、今回の要件は全体を描画しないと達成できなさそうなので仕方なく・・・
//     const { getByLabelText, getByText, findByText } = render(
//         <Provider store={store}>
//             <Router>
//                 <AdminContainer />
//             </Router>
//         </Provider>
//     );

//     const link = getByText(/logout/i);
//     fireEvent.click(link);

//     expect(await findByText(/login/i)).toBeInTheDocument();
// });
