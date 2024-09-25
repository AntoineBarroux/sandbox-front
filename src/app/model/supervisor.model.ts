export class Supervisor {
  public id: string;
  public firstName: string;
  public lastName: string;

  public constructor(data: Partial<Supervisor>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
