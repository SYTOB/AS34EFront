import { EditCategoriaModule } from './edit-categoria/edit-categoria.module';
import { AddCategoriaModule } from './add-categoria/add-categoria.module';
import { EditVideoModule } from './edit-video/edit-video.module';

import { AddVideoModule } from './add-video/add-video.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesInterfaceRoutingModule } from './courses-interface-routing.module';
import { CoursesInterfaceComponent } from './courses-interface.component';
import { Routes } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { CoursesInterfaceVideoModule } from './courses-interface-video/courses-interface-video.module';



@NgModule({
  declarations: [
    CoursesInterfaceComponent
  ],
  imports: [
    CommonModule,
    CoursesInterfaceRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    DragDropModule,
    CoursesInterfaceVideoModule,
    AddVideoModule,
    AddCategoriaModule,
    EditVideoModule,
    EditCategoriaModule
  ]
})
export class CoursesInterfaceModule { }
