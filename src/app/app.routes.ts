import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth-guard';
import { noAuthGuard } from './core/auth/no-auth-guard';
import { Home } from './features/home/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },
  { path: 'register', component: Register, canActivate: [noAuthGuard] },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: '**', redirectTo: '' },
];
