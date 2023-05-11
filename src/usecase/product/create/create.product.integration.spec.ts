import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputCreateProduct, OutputCreateProduct } from "./create.product.dto";
import ProductInterface from "../../../domain/product/entity/product.interface";

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository);
        const input: InputCreateProduct = {
            name: "Product A",
            price: 7.8,
            type: "a"
        };

        const { id } = await usecase.execute(input);
        const result = await repository.find(id);

        const output: OutputCreateProduct = {
            id,
            name: input.name,
            price: input.price
        };

        expect({
            id: result.id,
            name: result.name,
            price: result.price
        }).toEqual(output);
    });
});