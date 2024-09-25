export class EmployeeForm {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  supervisor: string;

  public constructor(data: Partial<EmployeeForm>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }
}
