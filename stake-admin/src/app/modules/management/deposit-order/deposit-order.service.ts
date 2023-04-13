import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DepositOrderService {

  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }

  searchDepositOrders() {

  }
}
