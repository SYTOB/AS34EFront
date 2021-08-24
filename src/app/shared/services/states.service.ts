import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  private readonly API = `${environment.APIstates}`;

  constructor(private http: HttpClient) {}

  lista() {
    return this.http.get('https://www47.kether.me/api/common/states',{ });
  }


}
