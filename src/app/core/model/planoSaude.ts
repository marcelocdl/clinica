
export class PlanoSaude {

    public id_plano_saude: number;
    public nome: String;
    public valor_consulta: number;

    constructor(
        id_plano_saude?: number, nome?: String, valor_consulta?: number
    ){
        this.id_plano_saude = <number> id_plano_saude;
        this.nome = <String> nome;
        this.valor_consulta = <number> valor_consulta;
    }

}