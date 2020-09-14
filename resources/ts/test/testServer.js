import "whatwg-fetch";
import { rest } from "msw";
import { setupServer } from "msw/node";

//toDo:mswのtsでの運用がわからず・・・
//異常系はtestごとにoverrideしてtest
const server = setupServer(
    rest.post("/api/register", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "test",
                email: "test@email.com",
                permissions: [],
                role: "undefiend"
            })
        );
    }),
    rest.post("/api/admin/login", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                name: "test",
                email: "test@email.com",
                permissions: ["createAdmin"],
                role: "superadmin"
            })
        );
    }),
    rest.get("/api/categories", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 1,
                    name: "test1",
                    slug: "test1",
                    products_count: 2
                },
                {
                    id: 2,
                    name: "test2",
                    slug: "test2",
                    products_count: 3
                }
            ])
        );
    }),
    rest.post("/api/logout", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                message: "Successfully log out!"
            })
        );
    }),
    rest.patch("/api/admin/products/1", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                { id: 1, name: "Toy", slug: "toy", products_count: 1 },
                { id: 2, name: "Shoes", slug: "shoes", products_count: 2 }
            ])
        );
    }),
    rest.delete("/api/admin/products/1", (_req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.delete("/api/admin/categories/1", (_req, res, ctx) => {
        return res(ctx.status(200));
    }),
    rest.post("/api/products/searchByCategory", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        id: 1,
                        name: "test1",
                        slug: "test1",
                        description: "random description",
                        quantity: "5",
                        weight: "300",
                        price: "10",
                        status: "5 items left",
                        created_at: "2020-07-23T02:18:43.000000Z",
                        updated_at: "2020-07-23T02:18:43.000000Z",
                        category_id: 1,
                        productimages: []
                    }
                ]
            })
        );
    }),
    rest.post("/api/products/searchByMultiple", (_req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    id: 1,
                    name: "sapiente",
                    slug: "sapiente",
                    description:
                        "Quibusdam repudiandae temporibus sint ex. Laboriosam exercitationem sapiente in rerum. Quam commodi et aut perspiciatis et.",
                    quantity: "5",
                    weight: "300",
                    price: "10",
                    status: "5 items left",
                    created_at: "2020-07-23T02:18:43.000000Z",
                    updated_at: "2020-07-23T02:18:43.000000Z",
                    category_id: "1",
                    productimages: []
                },
                {
                    id: 2,
                    name: "dummy",
                    slug: "dummy",
                    description: null,
                    quantity: "3",
                    weight: "500",
                    price: "600",
                    status: "3 items left",
                    created_at: "2020-07-23T02:18:43.000000Z",
                    updated_at: "2020-07-23T02:18:43.000000Z",
                    category_id: "1",
                    productimages: []
                }
            ])
        );
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

export { server, rest };
