import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medico } from "../model/medico";
import { PlanoSaude } from "../model/planoSaude";

@Injectable({
    providedIn: 'root'
})
export class PlanoSaudeService {
    private readonly URL = 'http://localhost:8080/planoSaude/';

    constructor(private http: HttpClient) {}

    public buscarPlanos(): Observable<PlanoSaude[]> {
        return this.http.get<PlanoSaude[]>(this.URL + 'planos');
    }

    public buscarPlano(id: number): Observable<PlanoSaude> {
        return this.http.get<PlanoSaude>(this.URL + `${id}`);
    }

    public incluir(planoSaude: PlanoSaude): Observable<PlanoSaude> {
        return this.http.post<PlanoSaude>(this.URL + 'cadastrar', planoSaude);
    }

    public atualizar(id: number, planoSaude: PlanoSaude): Observable<PlanoSaude> {
        return this.http.put<PlanoSaude>(this.URL + 'editar/'+id, planoSaude);
    }

    public deletar(id: number): Observable<any> {
        return this.http.delete(this.URL + `deletar/${id}`);
    }
}