import { EditCourseModule } from './edit-course/edit-course.module';
import { PurchaseCourseTicketModule } from './purchase-course-ticket/purchase-course-ticket.module';
import { PurchaseCourseCardModule } from './purchase-course-card/purchase-course-card.module';
import { CourseDetailModule } from './course-detail/course-detail.module';
import { CoursesHomeModule } from './courses-home/courses-home.module';
import { RegisterCourseModule } from './register-course/register-course.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    RegisterCourseModule,
    CoursesHomeModule,
    CourseDetailModule,
    PurchaseCourseCardModule,
    PurchaseCourseTicketModule,
    EditCourseModule
  ]
})
export class CoursesModule { }
