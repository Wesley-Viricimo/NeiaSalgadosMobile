class AddressModel {
    cep: string;
    state: string;
    city: string;
    district: string;
    road: string;
    number: string;
    complement: string;

    constructor(cep: string, state: string, city: string, district: string, road: string, number: string, complement: string) {
        this.cep = cep;
        this.state = state;
        this.city = city;
        this.district = district;
        this.road = road;
        this.number = number;
        this.complement = complement;
    }
}

export default AddressModel;