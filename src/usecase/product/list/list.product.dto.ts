export interface InputListProduct {
}

type Product = {
    id: string,
    name: string,
    price: number
}

export interface OutputListProduct {
    products: Product[]
}