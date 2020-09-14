import { cleanup } from "@testing-library/react";
import { ProductLaravel } from "../core/repository/product/ProductLaravel";
import { Product } from "../core/entity/Product";
import { server, rest } from "./testServer";
afterEach(cleanup);

it("ProductRepository correctly return ProductEntityList", async () => {
    const repository = new ProductLaravel();
    const res = await repository.searchByCategory(1); //returnはdummyなので別に入れるcategoryIdはなんでもいい

    //js内で型推定は行われていないのでそのままres.valueでよさそう
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
        expect(product).toEqual(res.value[index]);
    });
});
