import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';
import { MinesRound } from './mines.types';

@Injectable({
  providedIn: 'root'
})
export class MinesService {
  private _minesRound: BehaviorSubject<MinesRound | null> = new BehaviorSubject(null);
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }

  get minesRound$(): Observable<MinesRound> {
    return this._minesRound.asObservable();
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
  randomChoose(id: string): Observable<MinesRound> {
    return this._httpClient.get(this._apiService.users_mines_rounds_round_random_choose(id)).pipe(
      tap(minesRound => {
        this._minesRound.next(minesRound);
      })
    );
  }

  choose(id: string, position: number): Observable<MinesRound> {
    return this._httpClient.post<MinesRound>(this._apiService.users_mines_rounds_round_choose(id), { position: position }).pipe(
      tap(minesRound => {
        this._minesRound.next(minesRound);
      })
    );
  }
}
