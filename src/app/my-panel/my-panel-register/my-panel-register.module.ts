import { MyPanelRegisterComponent } from './my-panel-register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { NgxMaskModule, IConfig } from 'ngx-mask'


const maskConfig: Partial<IConfig> = {
  validation: false,
};



@NgModule({
  declarations: [MyPanelRegisterComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(maskConfig)
  ]
})
export class MyPanelRegisterModule { }
