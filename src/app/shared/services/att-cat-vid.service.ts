import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AttCatVidService {

  atualizaEmitter = new EventEmitter<boolean>();
  visualizaEmitter = new EventEmitter<number>();
  atualizaCursosEmitter = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  atualiza(){

      this.atualizaEmitter.emit(true);

  }

  visualiza(idVideo: number){

    console.log("VISUALIZA: ",idVideo);
    this.visualizaEmitter.emit(idVideo);

  }

  atualizaCurso(){
    this.atualizaCursosEmitter.emit(true);
  }

}
