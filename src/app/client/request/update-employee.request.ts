export class UpdateEmployeeRequest {
  public id: string;
  public firstName: string;
  public lastName: string;
  public position: string;
  public supervisorId: string;

  public constructor(data: Partial<UpdateEmployeeRequest>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }
}
