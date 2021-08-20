import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';

import {MatTable} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { FocusTrap } from '@angular/cdk/a11y';

export interface Video {
  id: number;
  titulo: string;
  url: string;
  categoria: string;
  visto: boolean;
}





@Component({
  selector: 'app-courses-interface',
  templateUrl: './courses-interface.component.html',
  styleUrls: ['./courses-interface.component.scss']
})
export class CoursesInterfaceComponent implements OnInit {

  adm = true;

  inscricao!: Subscription;

  nomeCurso: any;

  idCurso: any;

  idNext: any;

  teste = true;


  selectedCat: any = 'Introdução';

  idVideo: any;


  urlVideo:any =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tPOMG0D57S0");

  listaCategoria: any[]=['Introdução','Subversão','Final'];

  listaVideos: Video[] = [
    { id: 1, titulo: 'Introdução ao Angular', url: 'https://www.youtube.com/embed/tPOMG0D57S0',categoria: 'Introdução', visto: true},
    { id: 2, titulo: 'Ambiente de Desenvolvimento', url: 'https://www.youtube.com/embed/XxPjcMTZz5w',categoria: 'Introdução', visto: true},
    { id: 3, titulo: 'Hello World', url: 'https://www.youtube.com/embed/wBrIT2Z8t5I',categoria: 'Introdução', visto: true},
    { id: 4, titulo: 'Introdução a typescript', url: 'https://www.youtube.com/embed/cNJVzgUH0gA',categoria: 'Introdução', visto: false},
    { id: 5, titulo: 'Modulos(ngModule)', url: 'https://www.youtube.com/embed/3dXiZiPmt70',categoria: 'Introdução', visto: false},

    { id: 6, titulo: 'Introdução a Subversão', url: 'https://www.youtube.com/embed/tPOMG0D57S0',categoria: 'Subversão', visto: true},
    { id: 7, titulo: 'Ambiente de Subversão', url: 'https://www.youtube.com/embed/XxPjcMTZz5w',categoria: 'Subversão', visto: false},
    { id: 8, titulo: 'Hello Subversão', url: 'https://www.youtube.com/embed/wBrIT2Z8t5I',categoria: 'Subversão', visto: false},
    { id: 9, titulo: 'Introdução a Subversão', url: 'https://www.youtube.com/embed/cNJVzgUH0gA',categoria: 'Subversão', visto: false},
    { id: 10, titulo: 'Modulos(Subversão)', url: 'https://www.youtube.com/embed/3dXiZiPmt70',categoria: 'Subversão', visto: false},

    { id: 11, titulo: 'Introdução ao Final', url: 'https://www.youtube.com/embed/tPOMG0D57S0',categoria: 'Final', visto: false},
    { id: 12, titulo: 'Ambiente de Final', url: 'https://www.youtube.com/embed/XxPjcMTZz5w',categoria: 'Final', visto: false},
    { id: 13, titulo: 'Hello Final', url: 'https://www.youtube.com/embed/wBrIT2Z8t5I',categoria: 'Final', visto: false},
    { id: 14, titulo: 'Introdução a Final', url: 'https://www.youtube.com/embed/cNJVzgUH0gA',categoria: 'Final', visto: false},
    { id: 15, titulo: 'Modulos(Final)', url: 'https://www.youtube.com/embed/3dXiZiPmt70',categoria: 'Final', visto: false}

  ];



  constructor(private sanitizer: DomSanitizer, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

      this.inscricao = this.activeRoute.params.subscribe(
        (info) => {
          // console.log("info: ",info);
          this.nomeCurso = info['curso'];
        }
      );

      this.activeRoute.firstChild?.params.subscribe(
        (info) => {
          this.idCurso = info['id'];
          this.idNext = info['id'];
          console.log("idCurso: ",info['id']);
          this.next();

        }
      );

  }

  mudaUrl(novaUrl:any){


    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(novaUrl);
    console.log("Muda Url:", this.urlVideo);
  }

  next(){
    const aux = parseInt(this.idNext) + 1;

    this.idNext = aux.toString();
  }

  getUrl(){
    return this.urlVideo;
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

  getVideoIdModal(id:any){
    this.idVideo = id;
    console.log("Modal");


  }

  setTrue(id:any){
    this.idVideo = id;

  }


  pegarCategoria(){
    console.log("Categoria: ");
  }

  mudaValor(valor: any){
    console.log("Valor: ",valor);
    this.selectedCat = valor;
  }


}
