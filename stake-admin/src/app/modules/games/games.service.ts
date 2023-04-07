import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(
    private _httpClient: HttpClient,
    private _apiService: ApiService,
  ) { }
}
