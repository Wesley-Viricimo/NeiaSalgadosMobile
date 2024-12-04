export default class CategoryResponse {
    idCategory: string;
    description: string;

    constructor(idCategory: string, description: string) {
        this.idCategory = idCategory;
        this.description = description;
    }
}