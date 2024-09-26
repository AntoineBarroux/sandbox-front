import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';
import {CreateEmployeeRequest} from './request/create-employee.request';
import {UpdateEmployeeRequest} from './request/update-employee.request';

@Injectable()
export class EmployeeClient {

  private readonly httpClient: HttpClient = inject(HttpClient);

  public findAll(pagination: Pagination): Observable<Page<Employee>> {
    return this.httpClient.get<Page<Employee>>(`http://localhost:8050/employee?page=${pagination.page}&size=${pagination.size}`).pipe(
      map((data: any) => new Page<Employee>({
        ...data,
        content: data.content.map((employee: any) => new Employee({
          ...employee,
          createdAt: new Date(employee.createdAt * 1000),
        })),
      }))
    );
  }

  public delete(employeeId: string): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:8050/employee/${employeeId}`);
  }

  public create(createEmployeeRequest: CreateEmployeeRequest): Observable<Employee> {
    return this.httpClient.post<Employee>('http://localhost:8050/employee', createEmployeeRequest).pipe(
      map((data: any) => new Employee({
        ...data,
      }))
    );
  }

  public update(updateEmployeeRequest: UpdateEmployeeRequest): Observable<Employee> {
    return this.httpClient.put<Employee>(`http://localhost:8050/employee/${updateEmployeeRequest.id}`, updateEmployeeRequest).pipe(
      map((data: any) => new Employee({
        ...data,
      }))
    );
  }
}
