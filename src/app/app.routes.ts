import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':id',
    children: []
  },
  {
    path: '',
    redirectTo: '/another-game',
    pathMatch: 'full'
  }
];
