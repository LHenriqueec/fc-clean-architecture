import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { OutputListProduct } from "./list.product.dto";
import ListProductUseCase from "./list.product.usecase";

const product = new Product("123", "Product Test", 7.5);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue([product])
    }
}

describe("Unit test list products", () => {
    it("should list products", async () => {
        const repository = MockRepository();
        const usecase = new ListProductUseCase(repository);

        await usecase.execute({})
            .then(response => {
                const output: OutputListProduct = {
                    products: [{
                        id: product.id,
                        name: product.name,
                        price: product.price
                    }]
                };

                expect(response.products).toHaveLength(1)
                expect(response).toEqual(output);
            });
    });

    it("should return an empty list", async () => {
        const repository = MockRepository();
        const usecase = new ListProductUseCase(repository);

        repository.findAll.mockReturnValue([]);
        
        await usecase.execute({})
            .then(response => expect(response.products).toHaveLength(0));
    });
});