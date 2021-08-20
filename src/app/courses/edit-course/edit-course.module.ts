import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCourseComponent } from './edit-course.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule
  ]

})
export class EditCourseModule { }
