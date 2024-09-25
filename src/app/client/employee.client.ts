import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';

@Injectable()
export class EmployeeClient {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public findAll(pagination: Pagination): Observable<Page<Employee>> {
    return this.httpClient.get<Page<Employee>>(`http://localhost:8050/employee?page=${pagination.page}&size=${pagination.size}`).pipe(
      catchError((_: any) => {
        return of(new Page<Employee>());
      })
    );
  }

  public delete(employeeId: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8050/employee/${employeeId}`).pipe(
      catchError((_: any) => {
        return of();
      })
    );
  }
}
