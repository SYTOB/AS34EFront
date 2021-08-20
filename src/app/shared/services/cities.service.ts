import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private readonly API = `${environment.APIstates}`;

  constructor(private http: HttpClient) {}

  lista(estado:any) {
    return this.http.get(`@api/common/cities/`+estado,{});
  }


}
