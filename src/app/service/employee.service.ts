import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {BehaviorSubject, catchError, combineLatest, delay, map, Observable, of, Subject, switchMap, tap} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {CreateEmployeeRequest} from '../client/request/create-employee.request';
import {UpdateEmployeeRequest} from '../client/request/update-employee.request';
import {EmployeeForm} from '../component/form-employee/employee.form';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';
import {PaginationService} from './pagination.service';

@Injectable()
export class EmployeeService {

  private readonly employees$: Observable<Employee[]>;
  private readonly totalNumberOfElements$: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly employeeReload$: Subject<void> = new BehaviorSubject(null);
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public constructor(paginationService: PaginationService, private readonly employeeClient: EmployeeClient, private readonly messageService: MessageService) {
    this.employees$ = combineLatest([paginationService.getCurrentPagination(), this.employeeReload$]).pipe(
      delay(0),
      tap(() => this.isLoading$.next(true)),
      switchMap(([pagination, _]: [Pagination, any]) => employeeClient.findAll(pagination)),
      tap((_: Page<Employee>) => this.isLoading$.next(false)),
      tap((pagedEmployees: Page<Employee>) => this.totalNumberOfElements$.next(pagedEmployees.totalElements)),
      map((pagedEmployees: Page<Employee>) => pagedEmployees.content),
    );
  }

  public getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }

  public getTotalNumberOfElements(): Observable<number> {
    return this.totalNumberOfElements$;
  }

  public getEmployeeReload(): Observable<void> {
    return this.employeeReload$;
  }

  public getIsLoading(): Observable<boolean> {
    return this.isLoading$;
  }

  public deleteEmployee(employeeId: string): Observable<void> {
    return this.employeeClient.delete(employeeId).pipe(
      tap(() => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Employee successfully deleted !`,
        life: 3000
      })),
      catchError((error: any) => {
        this.messageService.add({severity: 'error', summary: 'An error occured...', detail: error.error.detail, life: 3000});
        return of(error);
      }),
      tap(() => this.employeeReload$.next())
    );
  }

  public createEmployee(employee: EmployeeForm): Observable<Employee> {
    return this.employeeClient.create(new CreateEmployeeRequest({
      supervisorId: employee.supervisor,
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position
    })).pipe(
      tap(() => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `The employee ${employee.firstName} ${employee.lastName} was successfully created !`,
        life: 3000
      })),
      catchError((error: any) => {
        this.messageService.add({severity: 'error', summary: 'An error occured...', detail: error.error.detail, life: 3000});
        return of(error);
      }),
      tap(() => this.employeeReload$.next())
    );
  }

  public updateEmployee(employee: EmployeeForm): Observable<Employee> {
    return this.employeeClient.update(new UpdateEmployeeRequest({
      id: employee.id,
      supervisorId: employee.supervisor,
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position
    })).pipe(
      tap(() => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `The employee ${employee.firstName} ${employee.lastName} was successfully updated !`,
        life: 3000
      })),
      catchError((error: any) => {
        this.messageService.add({severity: 'error', summary: 'An error occured...', detail: error.error.detail, life: 3000});
        return of(error);
      }),
      tap(() => this.employeeReload$.next())
    );
  }
}
