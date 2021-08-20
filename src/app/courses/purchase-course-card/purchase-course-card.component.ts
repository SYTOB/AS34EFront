import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-course-card',
  templateUrl: './purchase-course-card.component.html',
  styleUrls: ['./purchase-course-card.component.scss']
})
export class PurchaseCourseCardComponent implements OnInit {

  inscricao!: Subscription;
  numero: any;

  formulario!: FormGroup;

  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient
    ) { }

  ngOnInit() {
    this.inscricao = this.activeRoute.params.subscribe(
      (info) => {
        this.numero = info['id'];
        console.log(info['id']);
      }
    );

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      numeroCartao: [null, [Validators.required] ],
      periodo: [null,[Validators.required]],
      MM: [null, [Validators.required]],
      AA: [null, [Validators.required] ],
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

  }

}
