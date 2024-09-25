import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, switchMap, tap} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';
import {PaginationService} from './pagination.service';

@Injectable()
export class EmployeeService {

  private readonly employees$: Observable<Employee[]>;
  public readonly totalNumberOfElements$: BehaviorSubject<number> = new BehaviorSubject(0);

  public constructor(paginationService: PaginationService, private readonly employeeClient: EmployeeClient) {
    this.employees$ = paginationService.getCurrentPagination().pipe(
      switchMap((pagination: Pagination) => employeeClient.findAll(pagination)),
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

  public deleteEmployee(employeeId: string): Observable<void> {
    return this.employeeClient.delete(employeeId);
  }
}
