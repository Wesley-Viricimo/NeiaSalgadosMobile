class ProductModel {
    file: File
    description: string;
    price: number;

    constructor(file: File, description: string, price: number) {
        this.file = file,
        this.description = description;
        this.price = price;
    }
}

export default ProductModel;