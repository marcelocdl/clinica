import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo } from '../model/tipo';

@Injectable({
  providedIn: 'root'
})
export class TipoService {

   private readonly API_URL = 'http://localhost:8080/tipo/';

   constructor(private http: HttpClient) {
   } 

   getTipos(): Observable<Tipo[]>{
      return this.http.get<Tipo[]>(this.API_URL+'tipos');
   }  
}
