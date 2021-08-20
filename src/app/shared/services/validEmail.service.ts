import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map,tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ValidEmailService {

constructor(private http: HttpClient) { }

verificaEmail(email: string){
  return this.http.get('assets/Dados/verificarEmail.json')
  .pipe(
    delay(2000),
    map((dados: any) => dados.emails),
    map((dados: { email: string}[]) => dados.filter(v => v.email === email)),
    tap(console.log),
    map((dados: any[]) => dados.length > 0)
  );
}
}
