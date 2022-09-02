import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteAuthGuard } from './guards/site.auth.guard';
import { LoginAuthGuard } from './guards/login.auth.guard';

const routes: Routes = [
  {
    path: 'login',
    title: "Login",
    canActivate:[LoginAuthGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    title: "Home",
    canActivate:[SiteAuthGuard],
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
