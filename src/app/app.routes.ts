import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { CitasComponent } from './component/citas/citas.component';
import { authGuard } from './guards/auth.guard';
import { VerificarComponent } from './component/verificar/verificar.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { OrdenesComponent } from './component/ordenes/ordenes.component';

export const routes: Routes = [
  { path: '', component: HomeComponent,canActivate: [authGuard] },
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'citas', component: CitasComponent,canActivate: [authGuard] },
  { path: 'verificar', component: VerificarComponent,canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent,canActivate: [authGuard] },
  { path: 'ordenes', component: OrdenesComponent,canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent ,canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
