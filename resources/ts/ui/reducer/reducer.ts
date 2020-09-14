import { combineReducers } from "redux";
import { UserReducer } from "../feature/auth/redux/UserReducer";
import { AdminReducer } from "../feature/admin/auth/redux/AdminReducer";
import { ProductReducer } from "../feature/product/redux/ProductReducer";
import { CategoryReducer } from "../feature/category/redux/CategoryReducer";
import { ModalReducer } from "../feature/modal/redux/ModalReducer";
import { PageReducer } from "../feature/navbar/redux/PageReducer";
import { CartReducer } from "../feature/cart/redux/cartReducer";

const rootReducer = combineReducers({
    user: UserReducer,
    admin: AdminReducer,
    product: ProductReducer,
    category: CategoryReducer,
    modal: ModalReducer,
    page: PageReducer,
    cart: CartReducer
});

export default rootReducer;
