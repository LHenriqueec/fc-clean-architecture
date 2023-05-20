import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProduct, OutputListProduct } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private repository: ProductRepositoryInterface) {}

    async execute(input: InputListProduct): Promise<OutputListProduct> {
        const products = await this.repository.findAll();
        return OutputMapper.toOutput(products);
    }
}

class OutputMapper {
    static toOutput(products: ProductInterface[]): OutputListProduct {
        return {
            products: products.map(({ id, name, price }) => ({
                id,
                name,
                price
            }))
        }
    }
}