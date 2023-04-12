import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MinesRound } from './mines.types';
import { MinesService } from './mines.service';
import { AuthService } from 'app/core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MinesResolver implements Resolve<boolean> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }
}


@Injectable({
  providedIn: 'root'
})
export class MinesRoundResolver implements Resolve<MinesRound> {
  constructor(
    private _minesService: MinesService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MinesRound> {
    let minesRoundId = route.paramMap.get('id');
    return this._minesService.getMinesRound(minesRoundId);
  }
}

@Injectable({
  providedIn: 'root'
})
export class MinesRoundsResolver implements Resolve<MinesRound[]> {
  constructor(
    private _minesService: MinesService,
    private _authService: AuthService,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MinesRound[]> {
    return this._minesService.getMinesRounds();
  }
}
