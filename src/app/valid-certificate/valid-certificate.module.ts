import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidCertificateRoutingModule } from './valid-certificate-routing.module';
import { ValidCertificateComponent } from './valid-certificate.component';


@NgModule({
  declarations: [
    ValidCertificateComponent
  ],
  imports: [
    CommonModule,
    ValidCertificateRoutingModule
  ]
})
export class ValidCertificateModule { }
