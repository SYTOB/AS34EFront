import { AttCatVidService } from './../../shared/services/att-cat-vid.service';
import { InfoVideoService } from './../../shared/services/info-video.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { takeUntil } from 'rxjs/operators';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';


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

  idVideo: any;

  videoCap: any;

  urlCurso: any;

  idEtapa: any;


  nomeCurso: any;

  private _destroy: Subject<any> = new Subject<any>();

  constructor(
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private videoService: InfoVideoService,
    private passaId: AttCatVidService,
    private dialog: MatDialog) { }



  ngOnInit() {
    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idVideo = info['idVideo'];

        console.log("VIDEO-INTERFACE  ID VIDEO: ",this.idVideo);

        this.passaId.visualiza(this.idVideo);

        this.carregaVideo();

      }
    );

    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idEtapa = info['idEtapa'];

        console.log("VIDEO-INTERFACE  ID ETAPA: ",this.idEtapa);

      }
    );

    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {

        this.nomeCurso = info['curso'];
        console.log("VIDEO-INTERFACE NOME CURSO: ",this.nomeCurso);


      }
    );



  }


  carregaVideo(){

    this.videoService
    .getAula(
      this.idVideo
    )
    .subscribe(
      (success: any) => {


        this.videoCap = success;
        this.mudaUrl(this.videoCap.url_video);

      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );
  }

  ngOnDestroy(): void {
    this.inscricao?.unsubscribe();
    this._destroy.next(true);
    this._destroy.unsubscribe();

  }



  mudaUrl(url:any){
    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }

  openDialog() {
    console.log("Dialog");

    const observable = this.videoService.deleteAula(this.idVideo);

    const titulo = "Excluir Video"

    const mensagem = `Deseja Realmente excluir o video - ${this.videoCap.nome_video}`;

    const dialog = this.dialog.open(ModalComponent, {data: { mensagem , titulo , observable },width: '500px',height: '250px'})

  }


}
