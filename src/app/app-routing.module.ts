import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Guards } from './modules/shared';

const routes: Routes = [
  {
    path: 'login',
    title: "Login",
    canActivate:[Guards.LoginAuthGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    title: "Home",
    canActivate:[Guards.SiteAuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
