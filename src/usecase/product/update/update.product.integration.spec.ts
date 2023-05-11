import { Sequelize } from "sequelize-typescript";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputUpdateProduct } from "./update.product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("a", "Product A", 7.5);

describe("Test update product use case", () => {
    let sequelize: Sequelize;
    let repository: ProductRepositoryInterface;
    let usecase: UpdateProductUseCase;

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
        usecase = new UpdateProductUseCase(repository);
    });

    afterEach(() => {
        sequelize.close();
    });

    it("should update product", async () => {
        const input: InputUpdateProduct = {
            id: product.id,
            name: "Product Updated",
            price: product.price
        }

        await repository.create(product);
        
        const output = await usecase.execute(input);
        const productUpdate = await repository.find(product.id);

        expect({
            id: productUpdate.id,
            name: productUpdate.name,
            price: productUpdate.price
        }).toEqual(output);
    });
});