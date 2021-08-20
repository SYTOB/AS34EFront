import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidCertificateComponent } from './valid-certificate.component';

const routes: Routes = [{ path: '', component: ValidCertificateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidCertificateRoutingModule { }
