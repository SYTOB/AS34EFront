import { CoursesService } from './../../shared/services/courses.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  inscricao!: Subscription;

  numero!: any;

  detalhesCurso: any;

  constructor(private activeRoute: ActivatedRoute, private router: Router, private courseService: CoursesService) { }

  ngOnInit() {
    this.inscricao = this.activeRoute.params.subscribe(
      (info) => {
        this.numero = info['id'];
        console.log(info['id']);
      }
    );

    this.courseService
    .getCurso(
      this.numero
    )
    .subscribe(
      (success: any) => {
        console.log(success);

        this.detalhesCurso = success;

      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );



  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();

  }

  verificaLogin(){
    console.log("entrou")
    if(localStorage.getItem('token')){

      this.router.navigate(['/cursos/comprarCursoCard/',this.numero]);
    }else{

      this.router.navigate(['/login']);
    }
  }

}
