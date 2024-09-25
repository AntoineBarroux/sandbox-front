import {AsyncPipe} from '@angular/common';
import {Component} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {PaginatorModule} from 'primeng/paginator';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee.model';
import {EmployeeService} from '../../service/employee.service';
import {EmployeeComponent} from '../employee/employee.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeComponent,
    FaIconComponent,
    PaginatorModule,
    AsyncPipe
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {

  public readonly employees$: Observable<Employee[]>;

  public constructor(employeeService: EmployeeService) {
    this.employees$ = employeeService.getEmployees();
  }

  protected readonly faPlus = faPlus;
}
