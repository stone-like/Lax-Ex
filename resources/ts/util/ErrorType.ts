import { signUpErrorType } from "../core/error/signUp/signUpErrorType";
import { categoryErrorType } from "../core/error/category/categoryErrorType";
import {
    productErrorType,
    productImageErrorType
} from "../core/error/product/productErrorType";
import {
    roleErrorType,
    permissionToRoleErrorType
} from "../core/error/role/roleErrorType";
import { signInErrorType } from "../core/error/signIn/signInErrorType";
import { userErrorType } from "../core/error/user/userErrorType";
import { roleToAdminErrorType } from "../core/error/admin/adminErrorType";
import { cardErrorType } from "../core/error/card/cardErrorType";
import { discountErrorType } from "../core/error/discount/discountErrorType";
import { shippingErrorType } from "../core/error/shipping/shippingErrorType";
import { addressErrorType } from "../core/error/address/addressErrorType";
import { orderErrorType } from "../core/error/order/orderErrorType";
import { cartErrorType } from "../core/error/cart/cartErrorType";
import { permissionErrorType } from "../core/error/permission/permissionErrorType";
import { orderStatusErrorType } from "../core/error/orderStatus/orderStatusErrorType";
import { newsErrorType } from "../core/error/news/newsErrorType";

export type userAuthErrorType = addressErrorType &
    userErrorType &
    cardErrorType &
    cartErrorType &
    orderErrorType;
export type adminAuthErrorType = productImageErrorType &
    productErrorType &
    categoryErrorType &
    roleErrorType &
    roleToAdminErrorType &
    permissionErrorType &
    permissionToRoleErrorType &
    signUpErrorType &
    discountErrorType &
    shippingErrorType &
    orderErrorType &
    orderStatusErrorType &
    newsErrorType;

export type withAuthErrorType = userAuthErrorType &
    adminAuthErrorType & { auth?: string };
export type errorType =
    | signUpErrorType
    | signInErrorType
    | categoryErrorType
    | productErrorType
    | roleErrorType
    | userErrorType
    | roleToAdminErrorType
    | discountErrorType
    | shippingErrorType
    | cardErrorType
    | orderErrorType;
