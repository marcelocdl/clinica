import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../model/usuario";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private readonly URL = 'http://localhost:8080/usuario/';

    constructor(private http: HttpClient) {}

    public incluir(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.URL + 'cadastrar', usuario);
    }

}