import { ValidEmailService } from './../shared/services/validEmail.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';

import { map } from 'rxjs/operators';
import { User } from '../shared/user';
import { UsersService } from '../shared/services/users.service';
import { NotifyService } from '../shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: Usuario = new Usuario();
  inscricao!: Subscription;

  mostrarMenu: boolean = true;

  formulario!: FormGroup;

  users!: User[];


  constructor(
    private auth: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private serviceUsers: UsersService,
    private authService: AuthService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.inscricao = this.auth.mostrarMenuEmitter.subscribe(
      (mostrar) => (this.mostrarMenu = mostrar)
    );

    this.formulario = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  fazerLogin() {
    this.auth.fazerLogin();
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('rewr');
      this.serviceUsers
        .login(
          this.formulario.get('email')?.value,
          this.formulario.get('senha')?.value
        )
        .subscribe(
          (success: any) => {
            console.log(success);
            console.log(success.message);
            if(success.message){
              this.showToasterfailed();

            }else{

              localStorage.setItem('user',JSON.stringify(success));
              localStorage.setItem('token',success.token_usuario);
              this.auth.fazerLogin();
              this.showToasterSuccess();
              this.route.navigate(['/home']);
            }


          },
          (error) => {
            console.log(error);
            this.showToasterfailed();
          }
        );
    } else {
      console.log('Formulario invalido!');
      Object.keys(this.formulario.controls).forEach((campo) => {
        console.log('Campos: ', campo);
        const controle = this.formulario.get(campo);
        controle?.markAsDirty();
        controle?.markAllAsTouched();
      });
    }
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService
      .verificaEmail(formControl.value)
      .pipe(
        map((emailExiste) => (emailExiste ? { emailInvalido: true } : null))
      );
  }

  hasError(field: string, validate: string = 'required'): boolean | undefined {
    const aux = this.formulario.get(field);

    if (!aux?.touched) {
      return false;
    }
    return aux?.hasError(validate);
  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "Login efetuado com sucesso.";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }

}
