import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducer/reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/es/storage";
import expireIn from "redux-persist-transform-expire-in";
import { User } from "../../core/entity/User";
import { Admin } from "../../core/entity/Admin";
const reduxImmutableStateInvariant = require("redux-immutable-state-invariant").default();

const middlewares = [reduxImmutableStateInvariant];

// const expireTime = 5;
// const expirationKey = "expirationKey";
// const defaultValue = {
//     user: {
//         user: new User(null, "", "", [], "", false)
//     },
//     admin: {
//         admin: new Admin(null, "", "", [], "", null, false)
//     }
// };
// const persistConfig = {
//     key: "root",
//     storage,
//     whitelist: ["admin", "user"],
//     transform: [expireIn(expireTime, expirationKey, defaultValue)]
// };

// export const createPersistConfig = (expire: number) => {
//     return {
//         key: "root",
//         storage,
//         whitelist: ["admin", "user"],
//         transform: [expireIn(expire, expirationKey, [])]
//     };
// };

// const reducer = persistReducer(createPersistConfig(expireTime), rootReducer);

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);
// const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;

export const configureStore = () => {
    return { store };
};
