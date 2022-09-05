import { Pessoa } from "./pessoa";

export class Medico extends Pessoa{
    public id_medico: number;
    public num_crm: string;
    public especialidade: string;

    constructor(
        id_medico?: number, num_crm?: string, especialidade?: string
    ){
        super();
        this.id_medico = <number> id_medico,
        this.num_crm = <string> num_crm,
        this.especialidade = <string> especialidade
    }


}