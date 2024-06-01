import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private readonly BASE_URL = environment.API_URL; // URL de tu backend
  private readonly GETCITAS = `${this.BASE_URL}/citas/getCitas`;
  private readonly CREARCITAS = `${this.BASE_URL}/citas/crearCita`;

  constructor(private http: HttpClient, private router: Router) {}

 getCitas(): Observable<any> {
  return this.http.get<any>(this.GETCITAS)
 }

 crearCita(citasData:any):Observable<any>{
  return this.http.post<any>(this.CREARCITAS,citasData);
 }


}
