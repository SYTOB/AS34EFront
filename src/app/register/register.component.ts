import { UsersService } from './../shared/services/users.service';
import { ValidCpfService } from './../shared/services/valid-cpf.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../login/auth.service';
import { Usuario } from '../login/usuario';
import { FormValidComponent } from '../shared/form-valid/form-valid.component';
import { ValidEmailService } from '../shared/services/validEmail.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  usuario: Usuario = new Usuario();
  inscricao!: Subscription;

  mostrarMenu: boolean = true;

  formulario!: FormGroup;

  constructor(
    private auth: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private verificaEmailService: ValidEmailService,
    private serviceUsers: UsersService
    ) { }

  ngOnInit(): void {
    this.inscricao = this.auth.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );


    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: [null, [Validators.required, Validators.email] ],
      confirmarSenha: [null, [Validators.required, FormValidComponent.equalsTo('senha')] ],
      senha: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)] ]
    });

  }

  fazerLogin(){
    this.auth.fazerLogin();
  }


  onSubmit(){

    if (this.formulario.valid) {
      console.log('rewr');
      this.serviceUsers
        .register(
          this.formulario.get('nome')?.value,
          this.formulario.get('cpf')?.value,
          this.formulario.get('email')?.value,
          this.formulario.get('senha')?.value,
        )
        .subscribe(
          (success: any) => {
            console.log(success);

            this.auth.fazerLogin();
            this.route.navigate(['/login']);
          },
          (error) => {
            console.log(error);
            alert("Email ou senha incorretos!");
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

}
