import { BehaviorSubject, Observable, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { MinesRound } from './mines.types';

@Injectable({
  providedIn: 'root'
})
export class MinesService {
  private _minesRound: BehaviorSubject<MinesRound | null> = new BehaviorSubject(null);
  private _minesRounds: BehaviorSubject<MinesRound[] | null> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }

  get minesRound$(): Observable<MinesRound> {
    return this._minesRound.asObservable();
  }

  get minesRounds$(): Observable<MinesRound[]> {
    return this._minesRounds.asObservable();
  }

  createMinesRound(options: { betAmount: number, mines: number }): Observable<MinesRound> {
    return this._httpClient.post(this._apiService.users_mines_rounds(), options)
      .pipe(
        tap(minesRound => {
          this._minesRound.next(minesRound)
        })
      );
  }
  getMinesRound(id: string): Observable<MinesRound> {
    return this._httpClient.get(this._apiService.users_mines_rounds_round(id)).pipe(
      tap(minesRound => {
        this._minesRound.next(minesRound);
      })
    );
  }
  getMinesRounds(offset: number = 0, size: number = 10, sort: { time: -1 | 1 } = { time: -1 }): Observable<MinesRound[]> {
    return this._httpClient.get<MinesRound[]>(this._apiService.users_mines_rounds(offset, size, sort)).pipe(
      tap(minesRounds => {
        minesRounds = minesRounds.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        this._minesRounds.next(minesRounds);
      })
    );
  }

  randomChoose(id: string): Observable<MinesRound> {
    return this._httpClient.get(this._apiService.users_mines_rounds_round_random_choose(id)).pipe(
      tap(minesRound => {
        this._minesRound.next(minesRound);
      })
    );
  }

  choose(id: string, position: number): Observable<MinesRound> {
    return this._minesRounds.pipe(
      take(1),
      switchMap(minesRounds => {
        return this._httpClient.post<MinesRound>(this._apiService.users_mines_rounds_round_choose(id), { position: position }).pipe(
          tap(minesRound => {
            let index = minesRounds.findIndex(e => e._id == minesRound._id);
            if (index >= 0) {
              minesRounds[index] = minesRound;
            } else {
              minesRounds.push(minesRound);
            }
            minesRounds = minesRounds.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._minesRounds.next(minesRounds);
            this._minesRound.next(minesRound);
          })
        );
      })
    );
  }

  cashout(id: string): Observable<MinesRound> {
    return this._minesRounds.pipe(
      take(1),
      switchMap(minesRounds => {
        return this._httpClient.post<MinesRound>(this._apiService.users_mines_rounds_round_cashout(id), {}).pipe(
          tap(minesRound => {
            let index = minesRounds.findIndex(e => e._id == minesRound._id);
            if (index >= 0) {
              minesRounds[index] = minesRound;
            } else {
              minesRounds.push(minesRound);
            }
            minesRounds = minesRounds.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
            this._minesRounds.next(minesRounds);
            this._minesRound.next(minesRound);
          })
        );
      })
    );
  }
}
