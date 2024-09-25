import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, Subject, switchMap, tap} from 'rxjs';
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

  public constructor(paginationService: PaginationService, private readonly employeeClient: EmployeeClient) {
    this.employees$ = combineLatest([paginationService.getCurrentPagination(), this.employeeReload$]).pipe(
      switchMap(([pagination, _]: [Pagination, any]) => employeeClient.findAll(pagination)),
      tap((pagedEmployees: Page<Employee>) => this.totalNumberOfElements$.next(pagedEmployees.totalElements)),
      map((pagedEmployees: Page<Employee>) => pagedEmployees.content)
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

  public deleteEmployee(employeeId: string): Observable<void> {
    return this.employeeClient.delete(employeeId).pipe(
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
      tap(() => this.employeeReload$.next())
    );
  }
}
