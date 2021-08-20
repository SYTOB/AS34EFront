import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './courses-home/courses-home.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { PurchaseCourseCardComponent } from './purchase-course-card/purchase-course-card.component';
import { PurchaseCourseTicketComponent } from './purchase-course-ticket/purchase-course-ticket.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const routes: Routes = [
  {
    path: '', component: CoursesComponent,
    children: [
      { path: 'home', component: CoursesHomeComponent },
      { path: 'registrarCurso', component: RegisterCourseComponent },
      { path: 'comprarCursoCard/:id', component: PurchaseCourseCardComponent },
      { path: 'comprarCursoBoleto/:id', component: PurchaseCourseTicketComponent },
      { path: 'detalheCurso/:id', component: CourseDetailComponent },
      { path: 'editarCurso/:id', component: EditCourseComponent },
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
export class CoursesRoutingModule { }
