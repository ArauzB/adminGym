import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{

  perfilData:any = {
NOMBRE: '',
EMAIL:'',
TELEFONO:''

  };

  constructor(private authService:AuthService){

  }


  ngOnInit(): void {
   
    const token = this.authService.getToken();

    this.authService.getEmpleado(token).subscribe(
      (data) => {
        this.perfilData = data[0];
     
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );

  }

  perfil: any;

  

}
