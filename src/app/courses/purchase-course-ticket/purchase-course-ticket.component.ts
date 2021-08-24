import { Subscription } from 'rxjs/internal/Subscription';
import { CitiesService } from './../../shared/services/cities.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  timer } from 'rxjs';

import { map } from 'rxjs/operators';
import { StatesService } from 'src/app/shared/services/states.service';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { NotifyService } from 'src/app/shared/services/notify.service';




@Component({
  selector: 'app-purchase-course-ticket',
  templateUrl: './purchase-course-ticket.component.html',
  styleUrls: ['./purchase-course-ticket.component.scss']
})
export class PurchaseCourseTicketComponent implements OnInit {

  inscricao!: Subscription;
  inscricaoDelay!: Subscription;

  inscricaoStates!: Subscription;
  inscricaoCities!: Subscription;

  numero: any;

  auxState:any;

  auxiliar: any = true;

  public loading: boolean = true;

  formulario!: FormGroup;

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  listStates!: any[];
  listCidades!: any[];

  detalhesCurso: any;

  source = timer(500);






  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient,
    private states: StatesService,
    private cities: CitiesService,
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
        // console.log(success);

        this.detalhesCurso = success;



      },
      (error) => {

        console.log(error);
        alert("Erro!");
      }
    );

    this.inscricaoStates = this.states.lista().subscribe(
      (estados: any) => this.listStates = estados

    )



    this.formulario = this.formBuilder.group({
      nome: [this.user.nome_usuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: [this.user.email_usuario, [Validators.required] ],
      cpfCnpj: [null,[Validators.required]],
      cep: [null, [Validators.required]],
      endereco: [null, [Validators.required] ],
      numero: [null, [Validators.required] ],
      complemento: [null, [Validators.required] ],
      bairro: [null, [Validators.required] ],
      cidade: [null, [Validators.required] ],
      estado: [null, [Validators.required] ]
    });

  }

  loadCities(){
    this.inscricaoStates = this.cities.lista(this.formulario.get('estado')?.value).subscribe(
      (cidades: any) => this.listCidades = cidades
    )
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
          this.formulario.get('email')?.value,
          'BO',
          this.formulario.get('endereco')?.value,
          this.formulario.get('numero')?.value,
          this.formulario.get('complemento')?.value,
          this.formulario.get('bairro')?.value,
          this.formulario.get('estado')?.value,
          this.formulario.get('cidade')?.value,
          this.formulario.get('cep')?.value
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

    if(this.inscricaoStates){
      this.inscricaoStates.unsubscribe();
    }

    if(this.inscricaoCities){
      this.inscricaoCities.unsubscribe();
    }


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
