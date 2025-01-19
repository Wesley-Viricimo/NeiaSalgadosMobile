import { Address } from "@/types/FinishOrderTypes";

class OrderValidation {
    private paymentMethod: string;
    private address: Address | null;
    private typeOfDelivery: number;

    constructor(paymentMethod: string, address: Address | null, typeOfDelivery: number) {
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.typeOfDelivery = typeOfDelivery;
    }
    
    validateFinishOrder() {
        if(!this.paymentMethod) {
            return 'É necessário selecionar uma forma de pagamento para finalizar o pedido!';
        }

        if(this.typeOfDelivery == 0 && !this.address) {
            return 'É necessário fornecer um endereço para entrega!'
        }
    }
}

export default OrderValidation;
