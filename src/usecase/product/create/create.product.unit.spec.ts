import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProduct } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const inputA: InputCreateProduct = {
    name: 'Product A',
    price: 1000
}

const MockRepository = (): ProductRepositoryInterface => {
    return {
        find: jest.fn(),
        create: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn()
    }
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);

        const output = await createProductUseCase.execute(inputA);

        expect(repository.create).toHaveBeenCalled();
        expect(output).toEqual({
            id: expect.any(String),
            name: inputA.name,
            price: inputA.price
        })
    });

    it("should throw an erro when pricing is negative", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);

        inputA.price = -1;

        await expect(createProductUseCase.execute(inputA)).rejects.toThrow(
            "Price must be greater than zero"
        )
    });

    it("should throw an erro when name is missing", async () => {
        const repository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(repository);

        inputA.name = "";

        await expect(createProductUseCase.execute(inputA)).rejects.toThrow(
            "Name is required"
        )
    });
});