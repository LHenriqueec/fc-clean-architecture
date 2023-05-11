import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import FindProductUseCase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProduct } from "./find.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { v4 as uuid } from "uuid";

describe("Teste find product use case", () => {
    let sequelize: Sequelize;
    let repository: ProductRepositoryInterface;
    let usecase: FindProductUseCase;

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
        usecase = new FindProductUseCase(repository);
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product by id", async () => {
        const product = ProductFactory.create("a", "Product A", 7.5);
        const input: InputFindProduct = { id: product.id };

        await repository.create(product);

        const result = await usecase.execute(input);

        expect(result).toEqual({
            id: product.id,
            name: product.name,
            price: product.price
        })
    });

    it("should not found product", async () => {
        const input: InputFindProduct = { id: uuid() };
        
        await expect(() => usecase.execute(input))
            .rejects.toThrow("Product not found");

    });
});