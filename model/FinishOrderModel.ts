import { Address } from "@/types/FinishOrderTypes";

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
    address: Address | null;
    orderItens: OrderItem[];
    additionalItens: AdditionalItem[] | null;


    constructor(paymentMethod: number, typeOfDelivery: number, address: Address | null, orderItens: OrderItem[], additionalItens: AdditionalItem[] | null) {
        this.paymentMethod = paymentMethod;
        this.typeOfDelivery = typeOfDelivery;
        this.address = address;
        this.orderItens = orderItens;
        this.additionalItens = additionalItens;
    }
}

export default FinishOrderModel;