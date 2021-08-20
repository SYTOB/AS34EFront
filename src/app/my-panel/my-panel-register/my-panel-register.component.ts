import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';

@Component({
  selector: 'app-my-panel-register',
  templateUrl: './my-panel-register.component.html',
  styleUrls: ['./my-panel-register.component.scss']
})
export class MyPanelRegisterComponent implements OnInit {

  formulario!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/), Validators.maxLength(50)] ],
      email: [null, [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      confirmarSenha: [null, [Validators.required, FormValidComponent.equalsTo('senha')] ],
      senha: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ]
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

}
