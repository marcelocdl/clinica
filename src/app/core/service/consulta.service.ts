import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Consulta } from "../model/consulta";

@Injectable({
    providedIn: 'root'
})
export class ConsultaService {
    private readonly URL = 'http://localhost:8080/consulta/';

    constructor(private http: HttpClient) {}

    public buscarConsultas(): Observable<Consulta[]> {
        return this.http.get<Consulta[]>(this.URL + 'consultas');
    }

    public incluir(consulta: Consulta): Observable<Consulta> {
        return this.http.post<Consulta>(this.URL + 'cadastrar', consulta);
    }

    public atualizar(id: number, consulta: Consulta): Observable<Consulta> {
        return this.http.put<Consulta>(this.URL + 'atestado/'+id, consulta);
    }

    public gerarPdf(id_consulta: number){
        return this.http.get(this.URL + `genpdf/${id_consulta}`, {responseType: 'blob'});
    }

}