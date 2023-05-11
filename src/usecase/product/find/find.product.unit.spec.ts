import Product from "../../../domain/product/entity/product";
import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProduct, OutputFindProduct } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";
import { v4 as uuid } from "uuid";

const product: ProductInterface = new Product("abcd123", "Product Test", 7.5);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(product),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit teste find product use case", () => {

    it("should find product by id", async () => {
        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);
        const input:InputFindProduct = { id: uuid() };
        const output: OutputFindProduct = {
            id: product.id,
            name: product.name,
            price: product.price
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);
        const input:InputFindProduct = { id: "abc123" };

        repository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        await expect(() => usecase.execute(input))
            .rejects.toThrow("Product not found");
    });
});