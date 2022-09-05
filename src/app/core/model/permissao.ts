
export class Permissao{

    public id_permissao: number;
    public tipo: string;

    constructor(id_tipo?: number, descr_tipo?: string){
        this.id_permissao = <number> id_tipo;
        this.tipo = <string> descr_tipo;
    }

}