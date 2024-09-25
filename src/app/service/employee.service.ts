import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, map, Observable, Subject, switchMap, tap} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';
import {PaginationService} from './pagination.service';

@Injectable()
export class EmployeeService {

  private readonly employees$: Observable<Employee[]>;
  private readonly totalNumberOfElements$: BehaviorSubject<number> = new BehaviorSubject(0);
  private readonly employeeDeleted$: Subject<void> = new BehaviorSubject(null);

  public constructor(paginationService: PaginationService, private readonly employeeClient: EmployeeClient) {
    this.employees$ = combineLatest([paginationService.getCurrentPagination(), this.employeeDeleted$]).pipe(
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

  public deleteEmployee(employeeId: string): Observable<void> {
    return this.employeeClient.delete(employeeId).pipe(
      tap(() => this.employeeDeleted$.next())
    );
  }
}
