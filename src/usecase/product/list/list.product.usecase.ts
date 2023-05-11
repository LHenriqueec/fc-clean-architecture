import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProduct, OutputListProduct } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputListProduct): Promise<OutputListProduct[]> {
        return (await this.repository.findAll())
            .map(product => ({
                id: product.id,
                name: product.name,
                price: product.price
            }));
    }
}