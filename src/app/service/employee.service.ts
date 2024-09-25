import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {Employee} from '../model/employee.model';
import {Pagination} from '../model/pagination.model';
import {PaginationService} from './pagination.service';

@Injectable()
export class EmployeeService {

  private readonly employees$: Observable<Employee[]>;

  public constructor(paginationService: PaginationService, employeeClient: EmployeeClient) {
    this.employees$ = paginationService.getCurrentPagination().pipe(
      switchMap((pagination: Pagination) => employeeClient.findAll(pagination))
    );
  }

  public getEmployees(): Observable<Employee[]> {
    return this.employees$;
  }
}
