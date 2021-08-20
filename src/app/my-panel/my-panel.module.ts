import { MyPanelCertificatesModule } from './my-panel-certificates/my-panel-certificates.module';
import { MyPanelCoursesComponent } from './my-panel-courses/my-panel-courses.component';
import { MyPanelRegisterModule } from './my-panel-register/my-panel-register.module';
import { MyPanelDataModule } from './my-panel-data/my-panel-data.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyPanelRoutingModule } from './my-panel.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPanelComponent } from './my-panel.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyPanelCoursesModule } from './my-panel-courses/my-panel-courses.module';

@NgModule({
  imports: [
    CommonModule,
    MyPanelRoutingModule,
    MyPanelDataModule,
    MyPanelRegisterModule,
    MyPanelCoursesModule,
    MyPanelCertificatesModule

  ],
  declarations: [MyPanelComponent]
})
export class MyPanelModule { }
