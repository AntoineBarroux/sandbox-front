import {inject, Injectable} from '@angular/core';
import {map, Observable, switchMap} from 'rxjs';
import {EmployeeClient} from '../client/employee.client';
import {Employee} from '../model/employee.model';
import {Page} from '../model/page.model';
import {Pagination} from '../model/pagination.model';
import {Supervisor} from '../model/supervisor.model';
import {EmployeeService} from './employee.service';

@Injectable()
export class SupervisorService {

  private readonly employeeClient: EmployeeClient = inject(EmployeeClient);

  private readonly supervisors$: Observable<Supervisor[]>;

  public constructor(employeeService: EmployeeService) {
    this.supervisors$ = employeeService.getEmployeeReload().pipe(
      switchMap((_: any) => this.employeeClient.findAll(new Pagination({
        page: 0,
        size: 100
      }))),
      map((page: Page<Employee>) => page.content),
      map((employees: Employee[]) => employees.map((employee: Employee) => new Supervisor({
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName
      }))),
    );
  }

  public getSupervisors$(): Observable<Supervisor[]> {
    return this.supervisors$;
  }
}
