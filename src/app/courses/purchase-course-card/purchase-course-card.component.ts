import { CoursesService } from './../../shared/services/courses.service';
import { Subscription, timer } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-purchase-course-card',
  templateUrl: './purchase-course-card.component.html',
  styleUrls: ['./purchase-course-card.component.scss']
})
export class PurchaseCourseCardComponent implements OnInit {

  inscricao!: Subscription;
  inscricaoDelay!: Subscription;
  numero: any;

  formulario!: FormGroup;

  detalhesCurso: any;

  source = timer(500);

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  public loading: boolean = true;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient,
    private courseSevice: CoursesService,
    private notifyService: NotifyService,
    private route: Router
    ) { }

  ngOnInit() {
    this.inscricao = this.activeRoute.params.subscribe(
      (info) => {
        this.numero = info['id'];
        console.log(info['id']);
      }
    );


    this.inscricaoDelay = this.source.subscribe(
      (info) => this.loading = false
    )



    this.courseSevice
    .getCurso(
      this.numero
    )
    .subscribe(
      (success: any) => {
        console.log(success);

        this.detalhesCurso = success;

      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );

    this.formulario = this.formBuilder.group({
      nome: [this.user.nome_usuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      numeroCartao: [null, [Validators.required] ],

      MM: [null, [Validators.required, Validators.maxLength(12)]],
      AA: [null, [Validators.required, Validators.maxLength(50)] ],
      codigoSeguranca: [null, [Validators.required] ]
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

    if(this.formulario.valid) {


      this.courseSevice
        .buyCurso(
          this.numero,
          this.user.email_usuario, // id usuario
          'CC',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
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


  ngOnDestroy(){
    this.inscricao.unsubscribe();
    this.inscricaoDelay.unsubscribe();

  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "Compra efetuada.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }


}
