import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';


@NgModule({
  imports: [
    CommonModule,
    NgxLoaderIndicatorModule.forRoot()
  ],
  declarations: [
    ModalComponent
   ],
  exports:[
    ModalComponent
  ]
})
export class ModalModule { }
