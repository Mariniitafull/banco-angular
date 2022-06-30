import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  /* ruta raíz */
  { path: '', redirectTo: '/login/gestor', pathMatch: 'full' },
  { path: 'login/gestor', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'login/cliente', component: LoginClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
