import { InfoVideoService } from './../../shared/services/info-video.service';
import { CoursesService } from './../../shared/services/courses.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { Router } from '@angular/router';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss']
})
export class RegisterCourseComponent implements OnInit {

  formulario!: FormGroup;

  aux: any = 0;

  listStatus: string[] = ['Disponivel','Indisponivel'];
  listPeriodo: string[] = ['Mensal','Semestral','Anual'];



  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient,
    private courseService: CoursesService,
    private route: Router,
    private videoService: InfoVideoService,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      valor: [null, [Validators.required] ],
      periodo: [null,[Validators.required]],
      status: [null, [Validators.required]],
      descricao: [null, [Validators.required] ]
    });
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

    if (this.formulario.valid) {
      console.log('rewr');

      if(this.formulario.get('status')?.value == 'Disponivel'){
        this.aux = 1;
        console.log("Aux: ",this.aux);
      }else{
        this.aux = 0;
        console.log("Aux: ",this.aux);
      }

      this.courseService
        .insertCurso(
          this.formulario.get('nome')?.value,
          this.formulario.get('valor')?.value,
          this.formulario.get('periodo')?.value,
          this.formulario.get('descricao')?.value,
          this.aux
        )
        .subscribe(
          (success: any) => {
            console.log(success);
            this. showToasterSuccess();
            this.route.navigate(['/cursos/home']);
          },
          (error) => {
            console.log(error);
            this.showToasterfailed();
          }
        );
        //developeralysson@gmail.com
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
    const message = "Curso cadastrado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }



}
