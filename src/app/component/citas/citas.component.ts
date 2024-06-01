import { Component,OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { FormsModule ,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css'
})
export class CitasComponent implements OnInit {
  citaForm!: FormGroup;

  citas: any[] = [];

  citasData: any = {
  token: '',
  clienteId: '',
  fecha: '',
  hora: '',
  duracionMinutos: '',
  tipoCita: '',

  }

  

  clientes:any[] =[];

  constructor(private citasService:CitasService, private authService:AuthService,private router:Router){}


  ngOnInit(): void {

    this.citaForm = new FormGroup({
      clienteId: new FormControl(''),
      fecha: new FormControl(''),
      hora: new FormControl(''),
      duracionMinutos: new FormControl(''),
      tipoCita: new FormControl('')
    });


    this.citasData.token = this.authService.getToken();

    this.authService.getCLiente().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );

    this.citasService.getCitas().subscribe(
      (data) => {
        this.citas = data;
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );

  }

  crearCita(){
    this.citasService.crearCita(this.citasData).subscribe(
      (res: any) => {
       this.ngOnInit();
      },
      (err) => console.log(err)
    );
  }

}
