import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MinesRound } from './mines.types';
import { CashAccount, User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MinesService } from './mines.service';

@Component({
  selector: 'app-mines',
  templateUrl: './mines.component.html',
  styleUrls: ['./mines.component.scss']
})
export class MinesComponent implements OnInit, OnDestroy {
  size: number = 5;
  betForm: UntypedFormGroup;
  boxes: any[];
  mines: any[];
  minesRound: MinesRound;
  apiCalling: boolean = false;
  imageVersion: number = 0;
  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _minesService: MinesService,
  ) { }
  ngOnInit(): void {
    this.prepare();
    this._minesService.minesRound$.pipe(takeUntil(this._unsubscribeAll)).subscribe(minesRound => {
      this.minesRound = minesRound;
      this.imageVersion = new Date().getTime();
      if (!minesRound) {
        return;
      }
      this.prepare();
      this.betForm.patchValue({
        betAmount: minesRound.betAmount,
        mines: minesRound.mines,
      });
      if (this.minesRound.started) {
        this.betForm.disable();
      }
    });
  }
  prepare() {
    this.betForm = this._formBuilder.group({
      betAmount: [0, Validators.required],
      mines: [3, Validators.required],
    });
    this.boxes = [];
    this.mines = [];
    for (let i = 0; i < this.size * this.size; i++) {
      this.boxes.push({});
      this.mines.push({});
    }
    this.mines.pop();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  setBetAmount(value: number) {
    if (!this._userService.user) {
      this._router.navigate(['/sign-in'], {
        queryParams: {
          redirectUrl: this._router.url,
        }
      });
    }
    let safe = this._userService.user.cashAccount == CashAccount.REAL ? (value > this._userService.user.cash ? this._userService.user.cash : value) : (value > this._userService.user.demoCash ? this._userService.user.demoCash : value);
    this.betForm.patchValue({
      betAmount: safe,
    })
  }

  addAll() {
    this.setBetAmount(this._userService.user.cashAccount == CashAccount.REAL ? this._userService.user.cash : this._userService.user.demoCash);
  }
  multipleBetAmount(value: number) {
    let betAmount = parseFloat(this.betForm.get('betAmount').value);
    this.setBetAmount(betAmount * value);
  }
  choose(index: number) {
    if (!this.minesRound || !this.minesRound.started || this.minesRound.closed) {
      return;
    }
    this._minesService.choose(this.minesRound._id, index + 1).subscribe(minesRound => {
      this.minesRound = minesRound;
    })
  }

  createMinesRound() {
    this._minesService.createMinesRound(this.betForm.getRawValue()).subscribe((result: MinesRound) => {
      this._router.navigate([`/games/mines/${result._id}`]);
    });
  }

  charAt(index: number, value: string) {
    return value.charAt(index);
  }
  mineEffectImage(): string {
    return `/assets/images/mines/mineEffect.gif?v=` + this.imageVersion;
  }
}
