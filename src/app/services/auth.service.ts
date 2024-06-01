import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.API_URL; // URL de tu backend
  private readonly LOGIN_URL = `${this.BASE_URL}/auth/loginEmpleado`;
  private readonly SECURE_DATA_URL = `${this.BASE_URL}/auth/verify`;
  private readonly CREATEUSER = `${this.BASE_URL}/empleado/createEmpleado`;
  private readonly VERIFICAR = `${this.BASE_URL}/cliente/verificarCodigo`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, loginData);
  }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(this.CREATEUSER, registerData);
  }

  verificar(verificarData: any): Observable<any> {
    return this.http.post<any>(this.VERIFICAR, verificarData);
  }


  checkAuthentication(): Observable<any> {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({ 'x-access-token': token });
      return this.http.get(this.SECURE_DATA_URL, { headers });

    } else {
      return new Observable((observer) => observer.error('No token'));
    }
  }



  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.setAuthenticated(false);
  }
}
