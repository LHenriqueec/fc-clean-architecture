import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProduct, OutputFindProduct } from "./find.product.dto";

export default class FindProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputFindProduct): Promise<OutputFindProduct> {
        const result = await this.repository.find(input.id);
        return {
            id: result.id,
            name: result.name,
            price: result.price
        }
    }
}