import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-panel-data',
  templateUrl: './my-panel-data.component.html',
  styleUrls: ['./my-panel-data.component.scss']
})
export class MyPanelDataComponent implements OnInit {

  formulario!: FormGroup;

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  verifSenha: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private userService: UsersService,
    private route: Router
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: [this.user.nome_usuario, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: [this.user.email_usuario, [Validators.required, Validators.email]],
      senhaAtual: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ],
      confirmarNovaSenha: [null, [Validators.required, FormValidComponent.equalsTo('novaSenha')] ],
      novaSenha: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ]
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

      this.userService
      .validSenha(
        this.formulario.get('email')?.value,
        this.formulario.get('senhaAtual')?.value
      )
      .subscribe(
        (success: any) => {
          console.log(success);
          this.verifSenha = success;
          console.log("Verifica Senha: ",this.verifSenha.isValid);
          this.atualizaDados();
          this.route.navigate(['/painel/dados']);
        },
        (error) => {
          console.log(error);
          alert("Erro! Tente novamente!");
        }
      );
        //developeralysson@gmail.com
    }
    else{
      console.log("Formulario invalido!");
      Object.keys(this.formulario.controls).forEach(campo => {

        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
        controle?.markAllAsTouched();
      });
    }

  }

  atualizaDados(){
    console.log("entrou!");
    if(this.verifSenha.isValid){
      console.log("entro!");
      this.userService
        .attUser(
          this.formulario.get('email')?.value,
          this.formulario.get('nome')?.value,
          this.formulario.get('novaSenha')?.value
        )
        .subscribe(
          (success: any) => {
            console.log(success);

            alert("Dados Salvos!");
            this.formulario.reset();
            this.route.navigate(['/painel/dados']);
          },
          (error) => {
            console.log(error);
            alert("Erro! Tente novamente!");
          }
        );
    }else{
      alert("Campo senha Atual invalido!");
    }
  }

}
