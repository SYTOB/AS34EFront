import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { RouterModule } from '@angular/router';


import { PurchaseCourseCardComponent } from './purchase-course-card.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'


const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [PurchaseCourseCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMaskModule.forRoot(maskConfig)
  ]

})
export class PurchaseCourseCardModule { }
