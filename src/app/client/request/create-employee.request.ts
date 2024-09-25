export class CreateEmployeeRequest {
  public firstName: string;
  public lastName: string;
  public position: string;
  public supervisorId: string;

  public constructor(data: Partial<CreateEmployeeRequest>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }
}
