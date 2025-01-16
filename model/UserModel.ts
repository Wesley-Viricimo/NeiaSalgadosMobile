class UserModel {
    name: string;
    surname: string;
    cpf: string;
    phone: string;
    email: string;
    password: string;

    constructor(name: string, surname: string, cpf: string, phone: string, email: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email,
        this.password = password;
    }
}

export default UserModel;