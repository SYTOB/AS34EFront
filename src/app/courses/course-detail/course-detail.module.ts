import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './course-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CourseDetailComponent]
})
export class CourseDetailModule { }
