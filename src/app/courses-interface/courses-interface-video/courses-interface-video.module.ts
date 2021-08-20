import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesInterfaceVideoComponent } from './courses-interface-video.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CoursesInterfaceVideoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
  ]

})
export class CoursesInterfaceVideoModule { }

