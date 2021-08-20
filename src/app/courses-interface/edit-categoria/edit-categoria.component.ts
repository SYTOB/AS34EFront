import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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

  urlCurso: any;

  formulario!: FormGroup;

  nomeCurso: any;

  nomeCategoria: any;

  listCategoria: string[] = ['Introdução','Subversão'];




  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(
      (info) => {
        this.idCurso = info['id'];
        console.log("activeRouteCat: ",info['categoria']);
        this.nomeCategoria = info['categoria'];


      }
    );

    this.activeRoute.parent?.params.subscribe(
      (info) => {
        console.log("activeRoute: ",info['curso']);
        this.nomeCurso = info['curso'];


      }
    );

    this.formulario = this.formBuilder.group({
      titulo: [this.nomeCategoria, [ Validators.minLength(3), Validators.maxLength(50)] ]
    });





  }

  ngOnDestroy(): void {

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

      // this.fazerLogin();

      this.httpClient
        .post('https://httpbin.org/post', this.formulario.value)
        .subscribe(
          dados => {
            console.log(dados);
            //reseta o form
            this.formulario.reset();
        },
        (error: any) => alert('Erro!')
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

}
