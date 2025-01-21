export interface Product {
    idProduct: number;
}

export interface OrderItem {
    product: Product;
    quantity: number;
}

export interface AdditionalItem {
    idAdditional: number;
}

class FinishOrderModel {
    paymentMethod: number;
    typeOfDelivery: number;
    idAddress: number | undefined;
    orderItens: OrderItem[];
    additionalItens: AdditionalItem[] | null;


    constructor(paymentMethod: number, typeOfDelivery: number, idAddress: number | undefined, orderItens: OrderItem[], additionalItens: AdditionalItem[] | null) {
        this.paymentMethod = paymentMethod;
        this.typeOfDelivery = typeOfDelivery;
        this.idAddress = idAddress;
        this.orderItens = orderItens;
        this.additionalItens = additionalItens;
    }
}

export default FinishOrderModel;