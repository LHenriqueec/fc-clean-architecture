import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProduct, OutputUpdateProduct } from "./update.product.dto";

export default class UpdateProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputUpdateProduct): Promise<OutputUpdateProduct> {
        await this.repository.update({
            id: input.id,
            name: input.name,
            price: input.price
        });
        
        return {
            id: input.id,
            name: input.name,
            price: input.price
        }
    }
}