export default class ProductResponse {
    idProduct: number;
    title: string;
    description: string;
    price: number;     
    urlImage: string;

    constructor(idProduct: number, title: string, description: string, price: number, urlImage: string) {
        this.idProduct = idProduct;
        this.title = title;
        this.description = description;
        this.price = price;
        this.urlImage = urlImage;
    }
}