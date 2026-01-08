import { Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';

export const routes: Routes = [
  {
    path: 'game/:id',
    component: EmptyComponent
  },
  {
    path: '',
    redirectTo: '/game/roblox',
    pathMatch: 'full'
  }
];
