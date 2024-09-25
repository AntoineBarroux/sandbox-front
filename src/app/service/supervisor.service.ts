import {inject, Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';

@Injectable()
export class SupervisorService {

  private readonly employeeClient: EmployeeClient = inject(EmployeeClient);

  public getSupervisors$(): Observable<Employee[]> {
    return this.employeeClient.findAll(new Pagination({
      page: 0,
      size: 100
    })).pipe(
      map((page: Page<Employee>) => page.content),
    );
  }
}
