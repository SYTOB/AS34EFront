import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API = `${environment.API}users`;
  // private readonly API: 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  lista() {
    return this.http.get<User[]>(this.API).pipe();
  }

  login(username: string, password: string) {
    return this.http.post('@api/auth/login',{ username, password });
  }

  register(nome_usuario: string, cpf_usuario: number, email_usuario: string, senha_usuario:number) {
    return this.http.post('@api/users',{ nome_usuario, cpf_usuario, email_usuario, senha_usuario});
  }

}
