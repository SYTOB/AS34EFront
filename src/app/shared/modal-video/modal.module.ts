import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalVideoComponent } from './modal-video.component';
import { NgxLoaderIndicatorModule } from 'ngx-loader-indicator';


@NgModule({
  imports: [
    CommonModule,
    NgxLoaderIndicatorModule.forRoot()
  ],
  declarations: [
    ModalVideoComponent
   ],
  exports:[
    ModalVideoComponent
  ]
})
export class ModalVideoModule { }
