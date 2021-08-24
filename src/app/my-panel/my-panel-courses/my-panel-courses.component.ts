import { AttCatVidService } from './../../shared/services/att-cat-vid.service';
import { CoursesService } from './../../shared/services/courses.service';
import { StatesService } from 'src/app/shared/services/states.service';

import { observable, Observable, Subscription } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';


@Component({
  selector: 'app-my-panel-courses',
  templateUrl: './my-panel-courses.component.html',
  styleUrls: ['./my-panel-courses.component.scss']
})
export class MyPanelCoursesComponent implements OnInit {

  cursos: any;
  inscricao!: Subscription;


  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);




  constructor(
    private dialog: MatDialog,
    private states: StatesService,
    private atualiza: AttCatVidService,
    private courseService: CoursesService){


   }

  ngOnInit() {

    this.inscricao = this.atualiza.atualizaEmitter.subscribe(
      (success: boolean) => {

        if(success){
          this.carregarCursos();
        }else{
          alert("false!");
        }


      },
      (error) => {


        alert("ERRO AO ATUALIZAR!");
      }

    );

    this.carregarCursos();



  }

  carregarCursos(){

    if(this.user.tipo_usuario == 1){

      this.courseService
      .getCursos()
      .subscribe(
        (success: any) => {
          console.log(success);

          this.cursos = success;
          console.log("Lista cursos: ",this.cursos);

        },
        (error) => {

          console.log(error);
          alert("Erro!");
        }
      );

    }else{

      this.courseService
      .getCursosComprados(
        3
      )
      .subscribe(
        (success: any) => {
          console.log(success);

          this.cursos = success;
          console.log("Lista cursos: ",this.cursos);

        },
        (error) => {

          console.log(error);
          alert("Erro!");
        }
      );

    }

  }

  openDialog(item:number) {

    const observable = this.courseService.deleteCurso(item);

    const titulo = "Excluir curso"

    const mensagem = `Deseja Realmente excluir o curso - ${item}`;

    const dialog = this.dialog.open(ModalComponent, {data: { mensagem , titulo , observable },width: '500px',height: '250px'})

  }



}
