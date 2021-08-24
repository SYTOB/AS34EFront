import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';


import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private readonly API = `${environment.API}users`;
  // private readonly API: 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}


  login(email_usuario: string, senha_usuario: string) {
    return this.http.post('@api/usuarios/auth',{ email_usuario, senha_usuario });
  }

  registerUser(nome_usuario: string, cpf_usuario: number, email_usuario: string, senha_usuario:number, tipo_usuario: number) {
    return this.http.post('@api/usuarios',{ nome_usuario, cpf_usuario, email_usuario, senha_usuario, tipo_usuario});
  }

  attUser(email_usuario: string, nome_usuario: string, senha_usuario:number) {
    return this.http.post('@api/usuarios/update',{  email_usuario, nome_usuario, senha_usuario});
  }

  validSenha(email_usuario: string, senha_usuario: string) {
    return this.http.post('@api/usuarios/validate',{ email_usuario, senha_usuario });
  }

}
