import {Supervisor} from './supervisor.model';

export class Employee {
  public id: string;
  public firstName: string;
  public lastName: string;
  public position: string;
  public supervisor: Supervisor;

  public constructor(data: Partial<Employee>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }
}
