import { Tipo } from "./tipo";

export class Pessoa{
    public id_pessoa: number;
    public nome: string;
    public num_cpf: string;
    public genero: string;
    public dt_nascimento: string;
    public email: string;
    public tel_contato: string;
    public tipo: Tipo;

    constructor(
        id_pessoa?: number, nome?: string, num_cpf?: string, genero?: string,
        dt_nascimento?: string, email?: string, tel_contato?: string, tipo?: Tipo
    ){
        this.id_pessoa = <number> id_pessoa,
        this.nome = <string> nome,
        this.num_cpf = <string> num_cpf,
        this.genero = <string> genero,
        this.dt_nascimento = <string> dt_nascimento,
        this.email = <string> email,
        this.tel_contato = <string> tel_contato,
        this.tipo = <Tipo> tipo;
    }
}