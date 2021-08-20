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

  cursos: any[] = ["Angular","Java","NetBeans","Python","Culinaria"];




  constructor(private dialog: MatDialog, private states: StatesService){


   }

  ngOnInit() {

  }

  openDialog(item:any) {

    const observable = this.states.lista();

    const titulo = "Excluir curso"

    const mensagem = `Deseja Realmente excluir o curso - ${item}`;

    const dialog = this.dialog.open(ModalComponent, {data: { mensagem , titulo , observable },width: '500px',height: '250px'})

    // const dialogConfig = new MatDialogConfig();

    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;

    // this.dialog.open(ModalComponent, dialogConfig);
  }



}
