import { CitiesService } from './../../shared/services/cities.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatesService } from 'src/app/shared/services/states.service';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';

@Component({
  selector: 'app-purchase-course-ticket',
  templateUrl: './purchase-course-ticket.component.html',
  styleUrls: ['./purchase-course-ticket.component.scss']
})
export class PurchaseCourseTicketComponent implements OnInit {

  inscricao!: Subscription;
  inscricaoStates!: Subscription;
  inscricaoCities!: Subscription;

  numero: any;

  auxState:any;

  formulario!: FormGroup;

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  listStates!: any[];
  listCidades!: any[];


  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient,
    private states: StatesService,
    private cities: CitiesService
    ) { }

  ngOnInit() {
    this.inscricao = this.activeRoute.params.subscribe(
      (info) => {
        this.numero = info['id'];
        console.log(info['id']);
      }
    );

    this.inscricaoStates = this.states.lista().subscribe(
      (estados: any) => this.listStates = estados

    )



    this.formulario = this.formBuilder.group({
      nome: [this.user.nickname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: ["diovanips@hotmail.com", [Validators.required] ],
      cpfCnpj: ["116.458.721-89",[Validators.required]],
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


  ngOnDestroy(){
    this.inscricao.unsubscribe();

    if(this.inscricaoStates){
      this.inscricaoStates.unsubscribe();
    }

    if(this.inscricaoCities){
      this.inscricaoCities.unsubscribe();
    }


  }

}
