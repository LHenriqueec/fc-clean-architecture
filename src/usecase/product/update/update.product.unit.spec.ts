import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";
import { v4 as uuid } from "uuid";

const input: InputUpdateProduct = {
    id: uuid(),
    name: 'Product Updated',
    price: 10
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}

describe("Unit test update product use case", () => {
    it("should update product", async () => {
        const repository = MockRepository();
        const usecase = new UpdateProductUseCase(repository);

        const result = await usecase.execute(input);

        const output: OutputUpdateProduct = {
            id: input.id,
            name: input.name,
            price: input.price
        }

        expect(repository.update).toHaveBeenCalled();
        expect(result).toEqual(output);
    });
});