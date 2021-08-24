import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesInterfaceVideoComponent } from './courses-interface-video.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  declarations: [CoursesInterfaceVideoComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ModalModule
  ]

})
export class CoursesInterfaceVideoModule { }

