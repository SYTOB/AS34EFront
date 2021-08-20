import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesHomeComponent } from './courses-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CoursesHomeComponent]
})
export class CoursesHomeModule { }
