import { CursosService } from './../shared/services/cursos.service';
import { Component, OnInit } from '@angular/core';
import { Curso } from '../shared/curso';
import { FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  listaCursos!: Curso[];


  count!: number[];

  constructor() { }

  ngOnInit(): void {


    // this.listaCursos = this.service.retornaCursos();

  }



}
