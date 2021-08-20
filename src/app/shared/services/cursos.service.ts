import { Injectable } from '@angular/core';
import { Curso } from '../curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  auxCurso!: Curso;



  cursos!: Array<Curso>;


  constructor() {
    this.preencheCursos();
  }

  acrescentaCurso(curso: any){
    console.log("push");
    this.cursos.push(curso);
  }

  preencheCursos(){

    console.log("cursos:", this.cursos);


    this.acrescentaCurso(this.auxCurso);

    this.auxCurso.id = 2;
    this.auxCurso.nome = "Programação DeskTop 2";
    this.auxCurso.periodo = "Semanal";
    this.auxCurso.status = true;
    this.auxCurso.valor = 50;
    this.auxCurso.descrição = "Cursos destinado ao ensino de programação desktop mais avançado";

    this.acrescentaCurso(this.auxCurso);

    this.auxCurso.id = 3;
    this.auxCurso.nome = "Programação Culinaria";
    this.auxCurso.periodo = "Mensal";
    this.auxCurso.status = true;
    this.auxCurso.valor = 200;
    this.auxCurso.descrição = "Cursos destinado ao ensino de programação de pãozinhos";

    this.acrescentaCurso(this.auxCurso);

    this.auxCurso.id = 4;
    this.auxCurso.nome = "Programação Desconhecida";
    this.auxCurso.periodo = "Mensal";
    this.auxCurso.status = false;
    this.auxCurso.valor = 50;
    this.auxCurso.descrição = "Nao vai ser mostrado";

    this.acrescentaCurso(this.auxCurso);


  }

  retornaCursos(){
    console.log("cursos:", this.cursos)
    return this.cursos;
  }

}
