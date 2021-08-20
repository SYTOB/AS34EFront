
import { MyPanelComponent } from './my-panel.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyPanelHomeComponent } from './my-panel-home/my-panel-home.component';
import { MyPanelCoursesComponent } from './my-panel-courses/my-panel-courses.component';
import { MyPanelCertificatesComponent } from './my-panel-certificates/my-panel-certificates.component';
import { MyPanelDataComponent } from './my-panel-data/my-panel-data.component';
import { MyPanelRegisterComponent } from './my-panel-register/my-panel-register.component';





const routes: Routes = [
  {
    path: '', component: MyPanelComponent,
    children: [
      { path: 'home', component: MyPanelHomeComponent },
      { path: 'cursos', component: MyPanelCoursesComponent },
      { path: 'certificados', component: MyPanelCertificatesComponent },
      { path: 'dados', component: MyPanelDataComponent },
      { path: 'cadastrar', component: MyPanelRegisterComponent },
      {
        path: "**",
        redirectTo: "home"
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPanelRoutingModule { }


