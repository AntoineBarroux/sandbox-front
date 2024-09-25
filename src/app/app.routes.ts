import {Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    loadComponent: () => import('./component/employees/employees.component').then(m => m.EmployeesComponent),
  }
];
