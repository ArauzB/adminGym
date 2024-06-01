import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule ,FormGroup,FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  myFormGroup!: FormGroup;

  loginData={
    email:'',
    password:''
  }



  constructor(private authService:AuthService, private router:Router) { }

  login(): void {
    this.authService.login(this.loginData).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.authService.setAuthenticated(false);
        this.router.navigate(['/menu']).then(() => {
          window.location.reload();
        });

      },
      (err) => console.log(err)
    );
  }
  ngOnInit(): void {

    this.myFormGroup = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }


}
