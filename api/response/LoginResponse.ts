class LoginResponse {
    id: string;
    name: string;
    role: string;
    token: string;

    constructor(id: string, name: string, role: string, token: string)
    {
        this.id = id,
        this.name = name,
        this.role = role;
        this.token = token
    }
}

export default LoginResponse;