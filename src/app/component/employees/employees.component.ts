import {AsyncPipe} from '@angular/common';
import {Component, DestroyRef, inject} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from 'primeng/paginator';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {filter, map, Observable} from 'rxjs';
import {EmployeeClient} from '../../client/employee.client';
import {Employee} from '../../model/employee.model';
import {Pagination} from '../../model/pagination.model';
import {EmployeeService} from '../../service/employee.service';
import {PaginationService} from '../../service/pagination.service';
import {EmployeeComponent} from '../employee/employee.component';
import {EmployeeForm} from '../form-employee/employee.form';
import {FormEmployeeComponent} from '../form-employee/form-employee.component';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeComponent,
    FaIconComponent,
    PaginatorModule,
    AsyncPipe,
    Button,
    DialogModule,
    FormEmployeeComponent,
    ProgressSpinnerModule
  ],
  providers: [EmployeeService, PaginationService, EmployeeClient],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  protected readonly faPlus = faPlus;

  public readonly employees$: Observable<Employee[]>;
  public readonly currentPagination$: Observable<Pagination>;
  public readonly totalNumberOfElements$: Observable<number>;
  public readonly isLoading$: Observable<boolean>;
  public employeeToEdit: Employee;
  dialogVisible: boolean = false;

  public constructor(private readonly router: Router,
                     private readonly employeeService: EmployeeService,
                     paginationService: PaginationService,
                     activatedRoute: ActivatedRoute) {
    this.employees$ = employeeService.getEmployees();
    this.currentPagination$ = paginationService.getCurrentPagination();
    this.totalNumberOfElements$ = employeeService.getTotalNumberOfElements();
    this.isLoading$ = this.employeeService.getIsLoading();

    activatedRoute.queryParams.pipe(
      takeUntilDestroyed(inject(DestroyRef)),
      filter((params: Params) => params['page'] && params['size']),
      map((params: Params) => new Pagination({
        page: params['page'],
        size: params['size'],
      })),
    ).subscribe((pagination: Pagination) => paginationService.setCurrentPagination(pagination));
  }

  public currentPageChanged(event: any): void {
    this.router.navigate(['employees'], {
      queryParams: {
        page: event.page,
        size: event.rows
      }
    });
  }

  public closeDialog(): void {
    this.employeeToEdit = null;
    this.dialogVisible = false;
  }

  public createEmployee(): void {
    this.dialogVisible = true;
  }

  public saveEmployee(employee: EmployeeForm) {
    if (this.employeeToEdit) {
      this.updateEmployee(employee);
    } else {
      this.addEmployee(employee);
    }
  }

  private updateEmployee(employee: EmployeeForm) {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.closeDialog();
    });
  }

  private addEmployee(employee: EmployeeForm) {
    this.employeeService.createEmployee(employee).subscribe(() => {
      this.closeDialog();
    });
  }
}
