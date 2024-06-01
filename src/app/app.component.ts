import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { VerificarComponent } from './component/verificar/verificar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [VerificarComponent, RouterOutlet, NavbarComponent, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'adminGym';

  verificar: any = {
    token:'',
    verified:false,
    codigo: null
  };

  isAuthenticated = false;
  data: any;
  error: any;

  constructor( private authService: AuthService, private http: HttpClient, private router:Router) {}


  ngOnInit(): void {
    const token = this.authService.getToken();



    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;


      if (!isAuthenticated) {
        this.authService.checkAuthentication().subscribe(
          (response) => {
            this.data = response;
            this.isAuthenticated = true;
          },
          (error) => {
            this.error = error.message;
            this.logout();
          }
        );
      }
    });



    this.verificar.token = this.authService.getToken();

    if(token == null ){
      this.verificar.verified = true;
    }


    this.authService.verificar(this.verificar).subscribe(
      (data) => {
       this.verificar.verified = data.verified
       console.log(data);
      },
      (error) => {
        console.error('Error al obtener el estado del codigo', error);
      }
    );



  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.setAuthenticated(false);
  }

}
