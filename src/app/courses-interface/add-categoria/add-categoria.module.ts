import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoriaComponent } from './add-categoria.component';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [AddCategoriaComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]

})
export class AddCategoriaModule { }

