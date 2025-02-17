export interface Product {
    idProduct: number;
    title: string;
    description: string;
    price: number;
    urlImage: string;
}

export type ProductDetailsParams = {
    product: Product
};