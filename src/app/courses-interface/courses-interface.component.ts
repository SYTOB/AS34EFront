import { AttCatVidService } from './../shared/services/att-cat-vid.service';
import { InfoVideoService } from './../shared/services/info-video.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragHandle} from '@angular/cdk/drag-drop';

import {MatTable} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { FocusTrap } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { ModalVideoComponent } from '../shared/modal-video/modal-video.component';

import { HostListener } from "@angular/core";
import { NotifyService } from '../shared/services/notify.service';

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
  inscricaoVisu!: Subscription;

  nomeCurso: any;

  idCurso: any;

  idNext: any;

  teste = true;

  screenHeight: any;
  screenWidth: any;


  selectedCat: any;
  selectedCatNome: any;

  idVideo: any;

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);


  urlVideo:any =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/tPOMG0D57S0");

  listaCategoria: any;
  listaCategoria2: any[]=['Introducao','Subversao'];

  listaVideos: any;


  auxTeste: boolean = false;


  constructor(
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private videoService: InfoVideoService,
    private infoVideoService: InfoVideoService,
    private dialog: MatDialog,
    private atualiza: AttCatVidService,
    private notifyService: NotifyService
    ) {
      this.onResize();
    }

  ngOnInit(): void {

      this.inscricao = this.atualiza.atualizaEmitter.subscribe(
        (success: boolean) => {

          if(success){
            this.carregarEtapas();
          }else{
            alert("false!");
          }


        },
        (error) => {


          alert("ERRO AO ATUALIZAR!");
        }

      );

      this.inscricaoVisu = this.atualiza.visualizaEmitter.subscribe(
        (success: number) => {

          this.idNext = success;


        },
        (error: any) => {


          alert("ERRO AO ATUALIZAR!");
        }

      );


      this.activeRoute.params.subscribe(
        (info) => {
          // console.log("info: ",info);
          this.nomeCurso = info['curso'];
          console.log("NOME DO CURSO: ",this.nomeCurso);

        }
      );

      this.activeRoute.params.subscribe(
        (info) => {
          this.idCurso = info['id'];

          this.carregarEtapas();

        }
      );




  }


  carregarEtapas(){

    this.videoService
    .getAllInfoEtapas(
      this.idCurso
    )
    .subscribe(
      (success: any) => {


        this.listaCategoria = success;

        this.carregaVideos();

      },
      (error) => {


        alert("Course Main Erro!");
      }
    );

  }

  carregaVideos(){
    this.videoService
    .getAllAula(
      this.idCurso,
      this.user.email_usuario
    )
    .subscribe(
      (success: any) => {


        this.listaVideos = success;
        console.log("Lista videos: ",this.listaVideos);


      },
      (error) => {


        alert("Erro!");
      }
    );
  }

  mudaUrl(novaUrl:any){


    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(novaUrl);

  }

  visualiza(){

    this.videoService
    .visualizaVideo(
      this.idNext,
      this.user.email_usuario
    )
    .subscribe(
      (success: any) => {
        console.log(success);

        this.showToasterSuccess();
        this.atualiza.atualiza();
      },
      (error) => {
        console.log(error);
        this.showToasterfailed();
      }
    );


  }

  getUrl(){
    return this.urlVideo;
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
    this.inscricaoVisu.unsubscribe();

  }

  getVideoIdModal(id:any){
    this.idVideo = id;

  }

  setTrue(id:any){
    this.idVideo = id;
    console.log("O ID QUE VAI SE VIZU: ", this.idVideo);
  }


  pegarCategoria(){

  }

  mudaValor(valor: any, valorNome: any){

    this.selectedCat = valor;
    this.selectedCatNome = valorNome;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?:any) {
   this.screenHeight = window.innerHeight;
   this.screenWidth = window.innerWidth;
   console.log(this.screenHeight, this.screenWidth);
}


  openDialog(url: string) {

    if(this.screenWidth <= 960){

      const dialog = this.dialog.open(ModalVideoComponent, {data: { url },width: '300px',height: '220px'})
    }

  }

  openDialog2() {

    console.log("Dialog");

    const observable = this.videoService.deleteCat(this.selectedCat);

    const titulo = "Excluir Video"

    const mensagem = `Deseja Realmente excluir esta a categoria - ${this.selectedCatNome}?`;

    const dialog = this.dialog.open(ModalComponent, {data: { mensagem , titulo , observable },width: '500px',height: '250px'})

  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "Video adicionado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }





}
