import { AttCatVidService } from './../../shared/services/att-cat-vid.service';
import { InfoVideoService } from './../../shared/services/info-video.service';
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
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

  urlVideo:any;

  inscricao!: Subscription;

  idCurso: any;

  urlCurso: any;

  nomeCurso: any;

  idVideo: any;

  idEtapa: any;

  formulario!: FormGroup;

  listCategoria: any;


  private _destroy: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private videoService: InfoVideoService,
    private atualiza: AttCatVidService,
    private notifyService: NotifyService
    ) { }


  ngOnInit() {



    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idCurso = info['id'];
        console.log("ADDVideo curso ID: ",this.idCurso);
        this.carregaCategorias();
      }
    );

    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idEtapa = info['idEtapa'];
        console.log("ADDVideo etapa ID: ",this.idEtapa);
      }
    );

    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idVideo = info['idVideo'];
        console.log("ADDVideo Video ID: ",this.idVideo);
      }
    );

    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.nomeCurso = info['curso'];
      }
    );

    this.formulario = this.formBuilder.group({
      titulo: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      url: [null, [Validators.required] ],
      categoria: [null,[Validators.required]]
    });



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

    // https://www.youtube.com/embed/G5peoF1UUCY

    if(this.formulario.valid) {

      console.log("Categoria: ",this.formulario.get('categoria')?.value)

      this.videoService
      .insertNovaAula(
        this.formulario.get('titulo')?.value,
        this.formulario.get('url')?.value,
        this.formulario.get('categoria')?.value,
        this.idCurso

      )
      .subscribe(
        (success: any) => {
          console.log(success);

          this.showToasterSuccess();
          this.atualiza.atualiza();
          this.formulario.reset();
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
