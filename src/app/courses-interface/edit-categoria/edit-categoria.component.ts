import { AttCatVidService } from './../../shared/services/att-cat-vid.service';
import { InfoVideoService } from './../../shared/services/info-video.service';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit-categoriao',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss']
})
export class EditCategoriaComponent implements OnInit {

  urlVideo:any;

  inscricao!: Subscription;

  idCurso: any;

  idCategoria: any;

  urlCurso: any;

  formulario!: FormGroup;

  nomeCurso: any;

  nomeCategoria: any;

  listCategoria: string[] = ['Introdução','Subversão'];


  private _destroy: Subject<any> = new Subject<any>();

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute,
    private videoService: InfoVideoService,
    private route: Router,
    private atualiza: AttCatVidService,
    private notifyService: NotifyService
    ) { }

  ngOnInit() {

    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {

        console.log("NomeEstapa: ",info['categoria']);

        this.nomeCategoria = info['categoria'];
        this.carregaForm();

      }
    );

    this.activeRoute.parent?.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        this.idCurso = info['id'];
        this.nomeCurso = info['curso'];
        console.log("idCurso: ",this.idCurso);
        console.log("NomeCurso: ",this.nomeCurso);
      }

    );

    this.activeRoute.params.pipe(takeUntil(this._destroy)).subscribe(
      (info) => {
        console.log("IdEtapa: ",info['idCategoria']);
        this.idCategoria = info['idCategoria'];


      }
    );




    // tudo que precisar fazer unsubscribe vc pode usar esse pipe que ele vai fazer sem precisar criar varios subscriptions
    // .pipe(takeUntil(this._destroy)) Entendi


  }

  carregaForm(){
    this.formulario = this.formBuilder.group({
      titulo: [this.nomeCategoria, [ Validators.minLength(3), Validators.maxLength(50)] ]
    });
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
      .attEtapa(
        this.formulario.get('titulo')?.value,
        this.idCategoria

      )
      .subscribe(
        (success: any) => {
          console.log(success);
          this.atualiza.atualiza();
          this.route.navigate([`/coursesInterface/${this.nomeCurso}/${this.idCurso}`]);
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
    const message = "Etapa editada com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }

}
