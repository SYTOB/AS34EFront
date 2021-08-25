import { NotifyService } from './../../shared/services/notify.service';
import { UsersService } from './../../shared/services/users.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { Router } from '@angular/router';

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
    private httpClient: HttpClient,
    private serviceUsers: UsersService,
    private route: Router,
    private notifyService: NotifyService
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: [null, [Validators.required, Validators.email]],
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

    if (this.formulario.valid) {
      console.log('rewr');
      this.serviceUsers
        .registerUser(
          this.formulario.get('nome')?.value,
          this.formulario.get('cpf')?.value,
          this.formulario.get('email')?.value,
          this.formulario.get('senha')?.value,
          1
        )
        .subscribe(
          (success: any) => {
            console.log(success);

            this.showToasterSuccess();
            this.route.navigate(['/painel/cadastrar']);
          },
          (error) => {
            console.log(error);
            this.showToasterfailed();
          }
        );
        //developeralysson@gmail.com
    }
    else{

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
    const message = "Novo ADM cadastrado!";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, provavelmente o server ta DOWN.";
    this.notifyService.showError(message, titulo);
  }


}
