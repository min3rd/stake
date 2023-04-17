import { Component, OnInit } from '@angular/core';
import { DepositService } from './deposit.service';
import { DepositOrder, DepositOrderStatus } from './deposit.types';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  DepositOrderStatus: DepositOrderStatus;
  depositOrders$: Observable<DepositOrder[]>;
  apiCalling: boolean = false;
  transactionId: string = '';
  offset: number = 0;
  size: number = 10;
  constructor(
    private _depositService: DepositService,
    private _router: Router,
  ) {

  }
  ngOnInit(): void {
    this.depositOrders$ = this._depositService.depositOrders$;
  }
  createOrder() {
    this.apiCalling = true;
    this._depositService.createOrder().subscribe(depositOrder => {
      this._router.navigate(['/wallet/deposit/' + depositOrder._id]);
    }, e => { }, () => {
      this.apiCalling = false;
    });
  }

  checkTransaction() {

  }
  nextPage() {
    this.offset += this.size;
    this._depositService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
      if (!depositOrders.length) {
        this.offset = 0;
      }
    }, e => {
      this.offset = 0;
    });
  }

  prevPage() {
    this.offset -= this.size;
    this.offset = this.offset < 0 ? 0 : this.offset;
    this._depositService.getDepositOrders(this.offset, this.size).subscribe((depositOrders: DepositOrder[]) => {
      if (!depositOrders.length) {
        this.offset = 0;
      }
    }, e => {
      this.offset = 0;
    });
  }
}
