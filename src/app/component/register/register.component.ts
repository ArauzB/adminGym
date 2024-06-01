import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  myFormGroup!: FormGroup;

  registerData: any ={
    email: '',
    password: '',
    password_confirmation: '',
    nombre:'',
    telefono: '' ,
    apellido: '',
    rol_id: ''
  }


  constructor(private authService:AuthService, private router:Router){

  }

  ngOnInit(): void {
    this.myFormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      password_confirmation: new FormControl(''),
      nombre: new FormControl(''),
      telefono: new FormControl(''),
      apellido: new FormControl(''),
      rol_id: new FormControl('')
    });

  }

  register(){
    if (this.registerData.password == this.registerData.password_confirmation){
      this.authService.register(this.registerData).subscribe(
        (res: any) => {
          alert(res.message)
          localStorage.setItem('token', res.token);
          this.authService.setAuthenticated(false);
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        },
        (err) => console.log(err)
      );

    }

  }


}
