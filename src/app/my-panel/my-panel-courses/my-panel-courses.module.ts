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
    MatDialogModule
  ]

})
export class MyPanelCoursesModule { }
