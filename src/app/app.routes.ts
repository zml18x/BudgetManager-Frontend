import { Routes } from '@angular/router';
import { Home } from './features/home/home/home';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'auth',
    children: [{ path: 'login', component: LoginComponent }],
  },
  { path: '**', redirectTo: '' },
];
