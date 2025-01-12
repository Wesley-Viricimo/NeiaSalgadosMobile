export interface Additional {
    idAdditional: number;
    description: string;
    price: number;
}

export interface OrderItem {
    id: number;
    description: string;
    quantity: number;
    price: number;
    observation: string;
}

export interface Address {
  idAddress: number;
  cep: string;
  state: string;
  city: string;
  district: string; 
  road: string;
  number: string
  complement?: string;
}