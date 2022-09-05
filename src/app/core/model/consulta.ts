
import { Medico } from "./medico";
import { Pessoa } from "./pessoa";

export class Consulta {
    public id_consulta: number;
    public dt_consulta: string;
    paciente: Pessoa | undefined;
    medico: Medico | undefined;
    public atestado: BinaryType;

    constructor(
        id_consulta?: number, dt_consulta?: string, paciente?: Pessoa, medico?: Medico, atestado?: BinaryType
    ){
        this.id_consulta = <number> id_consulta,
        this.dt_consulta = <string> dt_consulta,
        this.paciente = <Pessoa> paciente,
        this.medico = <Medico> medico,
        this.atestado = <BinaryType> atestado
    }


}