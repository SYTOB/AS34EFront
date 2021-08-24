import { CoursesService } from './../../shared/services/courses.service';
import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {

  formulario!: FormGroup;
  listStatus: string[] = ['Disponivel','Indisponivel'];
  listPeriodo: string[] = ['Mensal','Semestral','Anual'];

  inscricao!: Subscription;
  numero: any;

  aux: any;

  auxStatus: any;

  detalhesCurso: any;


  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient,
    private activeRoute: ActivatedRoute,
    private courseService: CoursesService,
    private rout: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.inscricao = this.activeRoute.params.subscribe(
      (info) => {
        this.numero = info['id'];
        console.log(info['id']);
      }
    );

    this.courseService
    .getCurso(
      this.numero
    )
    .subscribe(
      (success: any) => {
        console.log(success);

        this.detalhesCurso = success;
        console.log("teste: ",this.detalhesCurso);

        if(this.detalhesCurso.visivel_curso == 1){
          this.auxStatus = 'Disponivel';
        }else{
          this.auxStatus = 'Indisponivel';
        }

        this.formulario = this.formBuilder.group({

          nome: [this.detalhesCurso.nome_curso, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
          valor: [this.detalhesCurso.preco_curso, [Validators.required] ],
          periodo: [this.detalhesCurso.periodo_curso,[Validators.required]],
          status: [this.auxStatus, [Validators.required]],
          descricao: [this.detalhesCurso.descricao_curso, [Validators.required] ]
        });

      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );





  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificaEmail(formControl.value)
    .pipe(
      map(emailExiste => emailExiste ? { emailInvalido:true } : null)
    );
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

      if(this.formulario.get('status')?.value == 'Disponivel'){
        this.aux = 1;
        console.log("Aux: ",this.aux);
      }else{
        this.aux = 0;
        console.log("Aux: ",this.aux);
      }

        console.log("entro!");
        this.courseService
          .attCurso(
            this.formulario.get('nome')?.value,
            this.formulario.get('valor')?.value,
            this.formulario.get('periodo')?.value,
            this.formulario.get('descricao')?.value,
            this.aux,
            this.numero

          )
          .subscribe(
            (success: any) => {
              console.log(success);

              this.showToasterSuccess();
              this.rout.navigate(['/painel/cursos']);
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
    const message = "Curso editado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, provavelmente o server ta DOWN.";
    this.notifyService.showError(message, titulo);
  }

}
