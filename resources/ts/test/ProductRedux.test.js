import { cleanup } from "@testing-library/react";
import { ProductLaravel } from "../core/repository/product/ProductLaravel";
import { ProductInteractor } from "../core/usecase/ProductInteractor";
import {
    ProductReducer,
    initialState as ProductInitial
} from "../ui/feature/product/redux/ProductReducer";
import { Product } from "../core/entity/Product";

afterEach(cleanup);

//多分責務が分かれてるのでreducerの役割がただproductをsetするだけなので、testは一つとか相当少なくていいはず、APIMock自体のtestはrepositoryTestでいいはずだし、UI絡むのはUITestでいいので
it("set product when category search occured", async () => {
    const repository = new ProductLaravel();
    const interactor = new ProductInteractor(repository);

    const res = await interactor.searchByCategory(1); //mockなので別に数字は適当...適当な数字ということをコメント抜きで表せるようになれば一番良いんだけど・・・
    const productState = ProductReducer(ProductInitial, {
        type: "SETPRODUCTLIST",
        payload: {
            productList: res.value
        }
    });

    [
        new Product(
            1,
            "sapiente",
            "sapiente",
            "1",
            "5",
            "10",
            "300",
            "5 items left",
            "Quibusdam repudiandae temporibus sint ex. Laboriosam exercitationem sapiente in rerum. Quam commodi et aut perspiciatis et."
        ),
        new Product(
            2,
            "dummy",
            "dummy",
            "1",
            "3",
            "600",
            "500",
            "3 items left",
            null
        )
    ].forEach((product, index) => {
        expect(product).toEqual(productState.productList[index]);
    });
});
