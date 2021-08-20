import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuarioAutenticado!: boolean;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(){

      this.usuarioAutenticado = true;
    // if(localStorage.getItem('token')){

      this.mostrarMenuEmitter.emit(true);

    // }else{
      // this.mostrarMenuEmitter.emit(false);
    // }

  }

  usuarioAuth(){

    return this.usuarioAutenticado;
  }

}
