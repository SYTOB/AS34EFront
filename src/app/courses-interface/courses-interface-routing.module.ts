import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { CoursesInterfaceVideoComponent } from './courses-interface-video/courses-interface-video.component';
import { CoursesInterfaceComponent } from './courses-interface.component';
import { EditCategoriaComponent } from './edit-categoria/edit-categoria.component';
import { EditVideoComponent } from './edit-video/edit-video.component';

const routes: Routes = [
  { path: ':curso', component: CoursesInterfaceComponent,
  children: [
    { path: ':id/addVideo', component: AddVideoComponent },
    { path: 'addCategoria', component: AddCategoriaComponent },
    { path: 'editCategoria/:id/:categoria', component: EditCategoriaComponent },
    { path: ':id/editVideo', component: EditVideoComponent },
    { path: ':id', component: CoursesInterfaceVideoComponent }

  ] }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesInterfaceRoutingModule { }
