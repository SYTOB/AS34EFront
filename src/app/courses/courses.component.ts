
import { Component, OnInit } from '@angular/core';
import { Curso } from '../shared/curso';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {


    // this.listaCursos = this.service.retornaCursos();

  }



}
