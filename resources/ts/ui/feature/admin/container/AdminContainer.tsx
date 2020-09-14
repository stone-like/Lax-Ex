import React, { Fragment, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { AdminHome } from "../home/AdminHome";
import { AdminProduct } from "../product/searchProduct/AdminProduct";
import { AdminSignUp } from "../auth/AdminSignUp";
import { AdminSideBar } from "../navbar/sidebar/AdminSideBar";
import styled from "styled-components";
import { AdminSignIn } from "../auth/AdminSignIn";
import { AdminSearchProduct } from "../product/searchProduct/AdminSearchProduct";
import { AdminProductTopPage } from "../product/searchProduct/AdminProductTopPage";
import Color from "../../../app/util/css/Color";
import { Error } from "../../../app/errorPage/Error";
import { AdminUpdateProduct } from "../product/update/AdminUpdateProduct";
import { AdminCreateProduct } from "../product/create/AdminCreateProduct";
import { AdminSearchCategory } from "../category/search/AdminSearchCategory";
import { AdminCreateCategory } from "../category/create/AdminCreateCategory";
import { AdminUpdateCategory } from "../category/update/AdminUpdateCategory";
import { AdminSearchUser } from "../user/search/AdminSearchUser";
import { AdminUpdateUser } from "../user/update/AdminUpdateUser";
import { AdminLogout } from "../auth/AdminLogout";
import { AdminSearchRole } from "../role/search/AdminSearchRole";
import { AdminUpdateRole } from "../role/update/AdminUpdateRole";
import { AdminCreateRole } from "../role/create/AdminCreateRole";
import { AdminSearchAdmin } from "../roleToAdmin/search/AdminSearchAdmin";
import { AdminAssignRole } from "../roleToAdmin/assign/AdminAssignRole";
import { AdminSyncRole } from "../roleToAdmin/sync/AdminSyncRole";
import { AdminSearchPermissionToRole } from "../permissionToRole/search/AdminSearchPermissionToRole";
import { AdminSyncPermission } from "../permissionToRole/sync/AdminSyncPermission";
import { AdminAssignPermission } from "../permissionToRole/assign/AdminAssignPermission";
import { AdminRemovePermission } from "../permissionToRole/remove/AdminRemovePermission";
import { CreateAdminRoute } from "../authenticatedRoute/CreateAdminRoute";
import { CreateRoleAndPermRoute } from "../authenticatedRoute/CreateRoleAndPermRoute";
import { AttachRoleAndPermRoute } from "../authenticatedRoute/AttachRoleAndPermRoute";
import { CreateNewsRoute } from "../authenticatedRoute/CreateNewsRoute";
import { AdminCreatePermission } from "../permission/create/AdminCreatePermission";
import { AdminUpdatePermission } from "../permission/update/AdminUpdatePermission";
import { AdminSearchPermission } from "../permission/search/AdminSearchPermission";
import { CreateProductRoute } from "../authenticatedRoute/CreateProductRoute";
import { ChangeUserRoute } from "../authenticatedRoute/ChangeUserRoute";
import { CreateCategoryRoute } from "../authenticatedRoute/CreateCategoryRoute";
import WithMediaComponent from "../../../app/util/css/WithMediaComponent";
import { AdminTopBar } from "../navbar/topbar/AdminTopBar";
import BreakPoint from "../../../app/util/css/BreakPoint";
import { generateMedia } from "styled-media-query";
import { CreateDiscountRoute } from "../authenticatedRoute/CreateDiscountRoute";
import { AdminSearchDiscount } from "../discount/search/AdminSearchDiscount";
import { AdminCreateDiscount } from "../discount/create/AdminCreateDiscount";
import { CreateShippingRoute } from "../authenticatedRoute/CreateShippingRoute";
import { UpdateOrderRoute } from "../authenticatedRoute/UpdateOrderRoute";
import { AdminUpdateShipping } from "../shipping/update/AdminUpdateShipping";
import { AdminSearchShipping } from "../shipping/search/AdminSearchShipping";
import { AdminCreateShipping } from "../shipping/create/AdminCreateShipping";
import { useAdmin } from "../../../../util/hooks/useAdmin";
import { AdminUpdateOrder } from "../order/update/AdminUpdateOrder";
import { AdminSearchOrder } from "../order/search/AdminSearchOrder";
import { CreateOrderStatusRoute } from "../authenticatedRoute/CreateOrderStatusRoute";
import { AdminSearchOrderStatus } from "../orderStatus/search/AdminSearchOrderStatus";
import { AdminCreateOrderStatus } from "../orderStatus/create/AdminCreateOrderStatus";
import { AdminCreateNews } from "../news/create/AdminCreateNews";
import { AdminUpdateNews } from "../news/update/AdminUpdateNews";
import { AdminSearchNews } from "../news/search/AdminSearchNews";

export const AdminContainer = () => {
    const SideBarOrTopBar = WithMediaComponent(
        AdminSideBar,
        AdminTopBar,
        BreakPoint.mobile
    );

    const { restoreFromLocalStorageHandler } = useAdmin();
    useEffect(() => {
        restoreFromLocalStorageHandler();
    }, []);

    return (
        <AdminDiv>
            {SideBarOrTopBar}
            <MainContainer>
                <Switch>
                    {/* createProductが必要 */}
                    <CreateProductRoute
                        exact
                        path="/admin/products"
                        component={AdminProductTopPage}
                    />
                    <CreateProductRoute
                        path="/admin/products/:id"
                        component={AdminUpdateProduct}
                    />
                    <CreateProductRoute
                        path="/admin/createproduct"
                        component={AdminCreateProduct}
                    />
                    <CreateProductRoute
                        path="/admin/searchproduct"
                        component={AdminSearchProduct}
                    />
                    {/* createProductが必要 */}
                    {/* attachRoleAndPermが必要 */}
                    <AttachRoleAndPermRoute
                        path="/admin/syncPermissionToRole"
                        component={AdminSyncPermission}
                    />
                    <AttachRoleAndPermRoute
                        path="/admin/removePermissionToRole"
                        component={AdminRemovePermission}
                    />
                    <AttachRoleAndPermRoute
                        path="/admin/assignPermissionToRole"
                        component={AdminAssignPermission}
                    />
                    <AttachRoleAndPermRoute
                        path="/admin/permissionToRole"
                        component={AdminSearchPermissionToRole}
                    />
                    <AttachRoleAndPermRoute
                        path="/admin/syncRoleToAdmin"
                        component={AdminSyncRole}
                    />
                    <AttachRoleAndPermRoute
                        path="/admin/assignRoleToAdmin"
                        component={AdminAssignRole}
                    />
                    <AttachRoleAndPermRoute
                        path={["/admin/roleToAdmin", "/admin/searchadmin"]}
                        component={AdminSearchAdmin}
                    />
                    {/* attachRoleAndPermが必要 */}
                    {/* createRoleAndPermが必要 */}
                    <CreateRoleAndPermRoute
                        path="/admin/createrole"
                        component={AdminCreateRole}
                    />
                    <CreateRoleAndPermRoute
                        path="/admin/roles/:id"
                        component={AdminUpdateRole}
                    />
                    <CreateRoleAndPermRoute
                        path={["/admin/roles", "/admin/searchrole"]}
                        component={AdminSearchRole}
                    />
                    <CreateRoleAndPermRoute
                        path="/admin/createpermission"
                        component={AdminCreatePermission}
                    />
                    <CreateRoleAndPermRoute
                        path="/admin/permissions/:id"
                        component={AdminUpdatePermission}
                    />
                    <CreateRoleAndPermRoute
                        path={["/admin/permissions", "/admin/searchpermission"]}
                        component={AdminSearchPermission}
                    />
                    {/* createRoleAndPermが必要 */}
                    {/* createNewsが必要 */}
                    <CreateNewsRoute
                        path="/admin/createnews"
                        component={AdminCreateNews}
                    />
                    <CreateNewsRoute
                        path="/admin/news/:id"
                        component={AdminUpdateNews}
                    />
                    <CreateNewsRoute
                        path={["/admin/news", "/admin/searchnews"]}
                        component={AdminSearchNews}
                    />
                    {/* createNewsが必要 */}
                    {/* changeUserが必要 */}
                    <ChangeUserRoute
                        path="/admin/users/:id"
                        component={AdminUpdateUser}
                    />
                    <ChangeUserRoute
                        path={["/admin/users", "/admin/searchuser"]}
                        component={AdminSearchUser}
                    />
                    {/* changeUserが必要 */}
                    {/* createDiscountが必要 */}
                    <CreateDiscountRoute
                        path={["/admin/discount", "/admin/searchdiscount"]}
                        component={AdminSearchDiscount}
                    />
                    <CreateDiscountRoute
                        path="/admin/creatediscount"
                        component={AdminCreateDiscount}
                    />
                    {/* createDiscountが必要 */}
                    {/* createShippingが必要 */}
                    <CreateShippingRoute
                        path="/admin/shipping/:id"
                        component={AdminUpdateShipping}
                    />
                    <CreateShippingRoute
                        path={["/admin/shipping", "/admin/searchshipping"]}
                        component={AdminSearchShipping}
                    />
                    <CreateShippingRoute
                        path="/admin/createshipping"
                        component={AdminCreateShipping}
                    />
                    {/* createShippingが必要 */}
                    {/* createOrderStatusが必要 */}
                    <CreateOrderStatusRoute
                        path={[
                            "/admin/orderStatus",
                            "/admin/searchOrderStatus"
                        ]}
                        component={AdminSearchOrderStatus}
                    />
                    <CreateOrderStatusRoute
                        path="/admin/createOrderStatus"
                        component={AdminCreateOrderStatus}
                    />
                    {/* createOrderStatusが必要 */}
                    {/* updateOrderが必要 */}
                    <UpdateOrderRoute
                        path="/admin/order/:id"
                        component={AdminUpdateOrder}
                    />
                    <UpdateOrderRoute
                        path={["/admin/order", "/admin/searchorder"]}
                        component={AdminSearchOrder}
                    />
                    {/* updateOrderが必要 */}
                    {/* createCategoryが必要 */}
                    <CreateCategoryRoute
                        path="/admin/category/:id"
                        component={AdminUpdateCategory}
                    />
                    <CreateCategoryRoute
                        path={["/admin/category", "/admin/searchcategory"]}
                        component={AdminSearchCategory}
                    />
                    <CreateCategoryRoute
                        path="/admin/createcategory"
                        component={AdminCreateCategory}
                    />
                    {/* createCategoryが必要 */}
                    　　　　　　　　　　　
                    {/*createAdminが必要 */}
                    <CreateAdminRoute
                        path="/admin/register"
                        component={AdminSignUp}
                    />
                    {/*createAdminが必要 */}
                    <Route path="/admin/error" component={Error} />
                    <Route path="/admin/logout" component={AdminLogout} />
                    <Route path="/admin/login" component={AdminSignIn} />
                    <Route
                        path={["/admin/home", "/admin"]}
                        component={AdminHome}
                    />
                </Switch>
            </MainContainer>
        </AdminDiv>
    );
};

const customMedia = generateMedia({
    breakpointMobile: `${BreakPoint.mobile}px`
});

const AdminDiv = styled.div`
    /* 　　ここでmin-heightをつかっているのは100%以上になるcontentが来た時、height:100%じゃ背景色が切れてしまうから。
　　min-heightであれば最低100%を確保しつつ、100%以上でも対応可能 */
    min-height: 100vh;
    width: 100vw;
    display: flex;

    ${customMedia.lessThan("breakpointMobile")`
       flex-direction:column;
    `}
`;

//mobileのときはmobile用に変更
const MainContainer = styled.div`
    padding-left: 20%;
    width: 100%;
    background-color: ${Color.mainWhite};

    ${customMedia.lessThan("breakpointMobile")`
       padding-left: 0%;
       padding-top:8vh;
       min-height:100vh;
       
    `}
`;
