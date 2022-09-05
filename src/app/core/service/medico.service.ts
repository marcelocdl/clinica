import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Medico } from "../model/medico";
import { Usuario } from "../model/usuario";

@Injectable({
    providedIn: 'root'
})
export class MedicoService {
   private readonly URL = 'http://localhost:8080/medico/';

   constructor(private http: HttpClient) {}

   public buscarMedicos(): Observable<Medico[]> {
      return this.http.get<Medico[]>(this.URL + 'medicos');
   }

   public buscarMedico(id: number): Observable<Medico> {
      return this.http.get<Medico>(this.URL + `medico/${id}`);
   }

   public incluir(medico: Medico): Observable<Medico> {
      return this.http.post<Medico>(this.URL + 'cadastrar', medico);
   }

   public atualizar(id: number, medico: Medico): Observable<Medico> {
      return this.http.put<Medico>(this.URL + 'editar/'+id, medico);
   }

   public deletar(id: number): Observable<any> {
      return this.http.delete(this.URL + `deletar/${id}`);
   }
}