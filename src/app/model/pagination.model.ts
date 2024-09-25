export class Pagination {
  public page: number;
  public size: number;

  public constructor(data: Partial<Pagination>) {
    // noinspection TypeScriptValidateTypes
    Object.assign(this, data);
  }
}
