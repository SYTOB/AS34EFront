import { InfoVideoService } from './../../shared/services/info-video.service';
import { AttCatVidService } from './../../shared/services/att-cat-vid.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';


export interface Video {
  id: number;
  titulo: string;
  url: string;
}


@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {

  urlVideo:any;

  inscricao!: Subscription;

  idCurso: any;

  urlCurso: any;

  idEtapa: any;

  idVideo: any;

  formulario!: FormGroup;

  nomeCurso: any;

  listCategoria: any;

  videoCap: any;

  etapaVideo: any;



  private _destroy: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private atualiza: AttCatVidService,
    private videoService: InfoVideoService,
    private notifyService: NotifyService
    ) { }

  ngOnInit() {


    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idEtapa = info['idEtapa'];
        this.idVideo = info['idVideo'];
        this.carregaVideo();




        console.log("ADDVideo Video ID: ",this.idVideo);
        console.log("ADDVideo etapa ID: ",this.idEtapa);
      }
    );

    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idCurso = info['id'];
        console.log("ADDVideo curso ID: ",this.idCurso);
        this.carregaCategorias();

      }
    );



    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.nomeCurso = info['curso'];
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
        console.log(success);

        this.videoCap = success;


        this.formulario = this.formBuilder.group({
          titulo: [this.videoCap.nome_video,[ Validators.minLength(3), Validators.maxLength(50)] ],
          url: [this.videoCap.url_video, [ Validators.maxLength(100)] ],
          categoria: [this.videoCap.id_etapa,[Validators.required]]
        });


        this.mudaUrl(this.videoCap.url_video);

      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );
  }

  carregaCategorias(){
    this.videoService
    .getAllInfoEtapas(
      this.idCurso
    )
    .subscribe(
      (success: any) => {
        console.log(success);

        this.listCategoria = success;

      },
      (error) => {

        console.log(error);
        alert("Course Main Erro!");
      }
    );
  }


  ngOnDestroy(): void {
    this._destroy.next(true);
    this._destroy.unsubscribe();
  }



  mudaUrl(url:any){

    this.urlVideo = this.sanitizer.bypassSecurityTrustResourceUrl(url);

  }


  hasError(field: string, validate: string = 'required'): boolean | undefined{

    const aux = this.formulario.get(field);

    if(!aux?.touched){
      return false;
    }
    return aux?.hasError(validate);
  }

  onSubmit(){

    if(this.formulario.valid) {

      this.videoService
      .attAula(
        this.idVideo,
        this.formulario.get('titulo')?.value,
        this.formulario.get('url')?.value,
        this.formulario.get('categoria')?.value

      )
      .subscribe(
        (success: any) => {
          console.log(success);
          this.atualiza.atualiza();
          // this.route.navigate([`/coursesInterface/${this.nomeCurso}/2`]);
          this.showToasterSuccess();
        },
        (error) => {
          console.log(error);
          this.showToasterfailed();
        }
      );

    }
    else{
      console.log("Formulario invalido!");
      Object.keys(this.formulario.controls).forEach(campo => {
        console.log("Campos: ",campo);
        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
        controle?.markAllAsTouched();
      });
    }

  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "Video editado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }

}
