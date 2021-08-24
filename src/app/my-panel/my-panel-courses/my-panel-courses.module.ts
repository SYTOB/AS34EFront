import { ModalModule } from './../../shared/modal/modal.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPanelCoursesComponent } from './my-panel-courses.component';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [MyPanelCoursesComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ModalModule
  ]

})
export class MyPanelCoursesModule { }
