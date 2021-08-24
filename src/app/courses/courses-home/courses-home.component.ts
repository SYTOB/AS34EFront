import { CoursesService } from './../../shared/services/courses.service';
import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent implements OnInit {

  count!: any[];

  aux: any;
  user: any = 0;

  constructor(
    private courseService: CoursesService,
    private notifyService: NotifyService
    ) { }

  ngOnInit() {

    console.log("User Tipo Courses Home: ",this.user.tipo_usuario);
    console.log("Lista cursos Courses Home: ",this.count);

    if(localStorage.getItem('user')){
      this.aux = localStorage.getItem('user');
      this.user = JSON.parse(this.aux);
    }

    this.courseService
    .getCursos()
    .subscribe(
      (success: any) => {
        console.log(success);

        this.count = success;
        console.log("Lista cursos Courses Home: ",this.count);

      },
      (error) => {

        console.log(error);
        this.showToasterfailed();
      }
    );

  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "Curso cadastrado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, provavelmente o servidor esta OFF.";
    this.notifyService.showError(message, titulo);
  }

}
