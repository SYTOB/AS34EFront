import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private readonly API = `${environment.API}compras`;
  // private readonly API: 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  //visivel curso é um NUMBER onde o  '0' é {false} e o '1' é {true}

  getAllCompras() {
    return this.http.get(this.API).pipe();
  }

  getCompra(id_compra: number) {
    return this.http.post('@api/compras',{ id_compra});
  }


  //CC O BO - tipo de compra
  registerNewCompra(id_curso: number, id_user: number, tipo_compra: number) {
    return this.http.post('@api/compras',{ id_curso, id_user, tipo_compra});
  }




}
