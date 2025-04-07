import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./soutenance.component').then(m => m.SoutenanceComponent),
    data: {
      title: $localize`Soutenance`
    }
  }
];

