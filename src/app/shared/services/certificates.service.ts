import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CertificatesService {


  private readonly API = `${environment.API}certificados`;

  constructor(private http: HttpClient) {}


  gerarCertificado(id_user: number, id_curso: number){

    return this.http.post('@api/certificados',{id_user, id_curso});

  }

  validarCertificado(hash: string){

    return this.http.post('@api/certificados/validate',{hash});

  }

  getCertificados() {
    return this.http.get(this.API).pipe();
  }

  getCertificado(hash: string){

    return this.http.post('@api/certificados',{hash});

  }

}
