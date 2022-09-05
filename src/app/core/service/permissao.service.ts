import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Permissao } from "../model/permissao";

@Injectable({
    providedIn: 'root'
})
export class PermissaoService {
  
    private readonly API_URL = 'http://localhost:8080/permissao/';
  
    constructor(private http: HttpClient) {

    } 
  
    getPermissoes(): Observable<Permissao[]>{
        return this.http.get<Permissao[]>(this.API_URL+'permissoes');
    }
    
    getPermissaoById(id: number): Observable<Permissao>{
        return this.http.get<Permissao>(this.API_URL+{id});
    }
}