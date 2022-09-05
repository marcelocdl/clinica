import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Pessoa } from "../model/pessoa";


@Injectable({
    providedIn: 'root'
})
export class SecretariaService {
   private readonly URL = 'http://localhost:8080/secretaria/';

   constructor(private http: HttpClient) {}

   public buscarSecretarias(): Observable<Pessoa[]> {
      return this.http.get<Pessoa[]>(this.URL + 'secretarias');
   }

   public buscarSecretaria(id: number): Observable<Pessoa> {
      return this.http.get<Pessoa>(this.URL + `${id}`);
   }

   public incluir(pessoa: Pessoa): Observable<Pessoa> {
      return this.http.post<Pessoa>(this.URL + 'cadastrar', pessoa);
   }

   public atualizar(id: number, pessoa: Pessoa): Observable<Pessoa> {
      return this.http.put<Pessoa>(this.URL + 'editar/'+id, pessoa);
   }

   public deletar(id: number): Observable<any> {
      return this.http.delete(this.URL + `deletar/${id}`);
   }
}