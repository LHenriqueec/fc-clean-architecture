import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductInterface from "../../../domain/product/entity/product.interface";
import { InputCreateProduct, OutputCreateProduct } from "./create.product.dto";

export default class CreateProductUseCase {

    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputCreateProduct): Promise<OutputCreateProduct> {
        const product: ProductInterface = ProductFactory.create(
            input.type,
            input.name,
            input.price
        );

        await this.repository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        };
    }
}