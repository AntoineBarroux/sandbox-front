export class Page<T> {
  public content: T[];
  public number: number;
  public totalElements: number;
  public size: number;

  public constructor(data: Partial<Page<T>>) {
    Object.assign(this, data);
  }
}
