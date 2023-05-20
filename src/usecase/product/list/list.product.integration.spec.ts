import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test list products use case", () => {
    let sequelize: Sequelize;
    let repository: ProductRepositoryInterface;
    let usecase: ListProductUseCase;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();

        repository = new ProductRepository();
        usecase = new ListProductUseCase(repository);
    });

    afterEach(() => {
        sequelize.close();
    });

    it("should response empty list", async () => {
        await usecase.execute({})
            .then(response => expect(response.products).toHaveLength(0));
    });

    it("should response list products", async () => {
        const product = ProductFactory.create("a", "Product A", 7.5);

        await repository.create(product);
        await usecase.execute({})
            .then(response => {
                expect(response.products).toHaveLength(1);
                expect(response.products[0]).toEqual({
                    id: product.id,
                    name: product.name,
                    price: product.price
                })
            });
    });
});