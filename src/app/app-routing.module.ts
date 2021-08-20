import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    // canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard]
  },
  {
    path: 'cursos',
     loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    // canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard]
  },
  {
    path: 'painel',
    loadChildren: () => import('./my-panel/my-panel.module').then(m => m.MyPanelModule)
    ,canActivate: [AuthGuard], canLoad: [AuthGuard]
    // canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard]
  },
  {
    path: 'sobre',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    // canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard]
  },
  {
    path: 'contato',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
    // canActivate: [AuthGuard], canActivateChild: [CursoGuard], canLoad: [AuthGuard]
  },
  {
    path: 'validarCertificado',
    loadChildren: () => import('./valid-certificate/valid-certificate.module').then(m => m.ValidCertificateModule)
  },
  { path: 'coursesInterface',
   loadChildren: () => import('./courses-interface/courses-interface.module').then(m => m.CoursesInterfaceModule)
   ,canActivate: [AuthGuard], canLoad: [AuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
