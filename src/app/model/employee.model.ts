import {Supervisor} from './supervisor.model';

export class Employee {
  public id: string;
  public createdAt: Date;
  public firstName: string;
  public lastName: string;
  public position: string;
  public supervisor: Supervisor;

  public constructor(data: Partial<Employee>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
