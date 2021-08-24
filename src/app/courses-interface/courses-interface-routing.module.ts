import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriaComponent } from './add-categoria/add-categoria.component';
import { AddVideoComponent } from './add-video/add-video.component';
import { CoursesInterfaceHomeComponent } from './courses-Interface-home/courses-Interface-home.component';
import { CoursesInterfaceVideoComponent } from './courses-interface-video/courses-interface-video.component';
import { CoursesInterfaceComponent } from './courses-interface.component';
import { EditCategoriaComponent } from './edit-categoria/edit-categoria.component';
import { EditVideoComponent } from './edit-video/edit-video.component';

const routes: Routes = [
  { path: ':curso/:id', component: CoursesInterfaceComponent,
  children: [
    { path: 'home', component: CoursesInterfaceHomeComponent },
    { path: 'addCategoria', component: AddCategoriaComponent },
    { path: ':idEtapa/:idVideo', component: CoursesInterfaceVideoComponent },
    { path: 'editVideo/:idVideo/:idEtapa', component: EditVideoComponent },
    { path: 'addVideo/:idVideo/:idEtapa', component: AddVideoComponent },
    { path: 'editCategoria/:categoria/:idCategoria', component: EditCategoriaComponent }



  ] }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesInterfaceRoutingModule { }
