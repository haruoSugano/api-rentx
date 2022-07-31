import { v4 as uuidV4 } from "uuid";

class Category{
    id?: string;
    name: string;
    description: string;
    created_at: Date;
    // Atribuindo a está classe a responsabilidade de acrescentar o id ao objeto
    constructor() {
        if(!this.id){ // this.id para referenciar o id
            this.id = uuidV4();
        }
    }
}

export { Category };