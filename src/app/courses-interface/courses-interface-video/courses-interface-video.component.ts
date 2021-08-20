import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


export interface Video {
  id: number;
  titulo: string;
  url: string;
  categoria: string;
  visto: boolean
}





@Component({
  selector: 'app-courses-interface-video',
  templateUrl: './courses-interface-video.component.html',
  styleUrls: ['./courses-interface-video.component.scss']
})
export class CoursesInterfaceVideoComponent implements OnInit {

  urlVideo:any;

  inscricao!: Subscription;

  idCurso: any;

  urlCurso: any;

  nomeCurso: any;

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



  ngOnInit() {
    this.activeRoute.params.subscribe(
      (info) => {
        this.idCurso = info['id'];
        this.percorreLista(this.idCurso);

      }
    );

    this.activeRoute.parent?.params.subscribe(
      (info) => {
        console.log("activeRoute: ",info['curso']);
        this.nomeCurso = info['curso'];
        this.percorreLista(this.idCurso);

      }
    );

  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
  }



  mudaUrl(url:any){

    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  percorreLista(id:number){

    for(let i=0;i<this.listaVideos.length;i++){

      if(this.listaVideos[i].id == this.idCurso){
        this.urlCurso = this.listaVideos[i].url;
        this.mudaUrl(this.urlCurso);
      }
    }

  }

}
