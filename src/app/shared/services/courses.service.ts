import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

import { Curso } from '../curso';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = `${environment.API}cursos`;
  // private readonly API: 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  //visivel curso é um NUMBER onde o  '0' é {false} e o '1' é {true}

  insertCurso(nome_curso: string, preco_curso:number, periodo_curso: string,
    descricao_curso: string, visivel_curso: number){

    return this.http.post('@api/cursos',{ nome_curso, preco_curso, periodo_curso,
       descricao_curso, visivel_curso});

  }

  attCurso(nome_curso: string, preco_curso:number, periodo_curso: string,
    descricao_curso: string, visivel_curso: number, id_curso: number){

    return this.http.post('@api/cursos/update',{ nome_curso, preco_curso, periodo_curso,
       descricao_curso, visivel_curso, id_curso});

  }

  deleteCurso(id_curso: number){

    return this.http.post('@api/cursos/delete',{id_curso});

  }

  getCursos() {
    return this.http.get('@api/cursos');
  }

  getCursosComprados(email_usuario: string) {
    return this.http.get(`@api/cursoUsuario/${email_usuario}`);
  }

  getCurso(id_curso: number){

    return this.http.get(`@api/cursos/${id_curso}`);

  }

  getCursoUser(id_user: number){

    return this.http.post('@api/cursoUsuario',{id_user});

  }

  attProgressoUser(id_curso: number, id_user: number, id_video: number){

    return this.http.post('@api/cursoUsuario/atualizarProgresso',{id_curso, id_user, id_video});

  }

  buyCurso(id_curso: number, email_usuario: string, tipo_compra: string, rua_endereco: string,
    numero_endereco: string, complemento_endereco: string, bairro_endereco: string,
    estado_endereco: string, cidade_endereco: string, cep_endereco: string){

    return this.http.post('@api/compras',{id_curso, email_usuario, tipo_compra,
      rua_endereco, numero_endereco, complemento_endereco, bairro_endereco, estado_endereco, cidade_endereco, cep_endereco});

  }




}
