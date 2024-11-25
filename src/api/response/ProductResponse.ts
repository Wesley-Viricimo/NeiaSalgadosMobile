export default class ProductResponse {
    idProduct: number;
    description: string;
    price: number;     
    urlImage: string;

    constructor(idProduct: number, description: string, price: number, urlImage: string) {
        this.idProduct = idProduct;
        this.description = description;
        this.price = price;
        this.urlImage = urlImage;
    }
}