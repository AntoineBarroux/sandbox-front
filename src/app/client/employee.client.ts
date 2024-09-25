import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {Employee} from '../model/employee.model';
import {Pagination} from '../model/pagination.model';

@Injectable()
export class EmployeeClient {

  public constructor(private readonly httpClient: HttpClient) {

  }

  public findAll(pagination: Pagination): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>('http://localhost:8050/employee').pipe(
      catchError((error: any) => {
        console.log('error', error);
        return of([]);
      })
    );
  }
}
