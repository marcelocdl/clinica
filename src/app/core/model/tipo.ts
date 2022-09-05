
export class Tipo{

    public id_tipo: number;
    public descr_tipo: string;

    constructor(id_tipo?: number, descr_tipo?: string){
        this.id_tipo = <number> id_tipo;
        this.descr_tipo = <string> descr_tipo;
    }

}