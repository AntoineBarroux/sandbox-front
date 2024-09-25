import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Pagination} from '../model/pagination.model';

@Injectable()
export class PaginationService {

  private readonly currentPagination$: BehaviorSubject<Pagination> = new BehaviorSubject(new Pagination({
    page: 0,
    size: 10
  }));

  public setCurrentPagination(pagination: Pagination): void {
    this.currentPagination$.next(pagination);
  }

  public getCurrentPagination(): Observable<Pagination> {
    return this.currentPagination$;
  }
}
