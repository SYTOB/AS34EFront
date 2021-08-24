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
import { NotifyService } from '../shared/services/notify.service';


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
    private serviceUsers: UsersService,
    private notifyService: NotifyService
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
        .registerUser(
          this.formulario.get('nome')?.value,
          this.formulario.get('cpf')?.value,
          this.formulario.get('email')?.value,
          this.formulario.get('senha')?.value,
          0
        )
        .subscribe(
          (success: any) => {
            console.log(success);
            this.showToasterSuccess();
            this.route.navigate(['/login']);
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
    const message = "Cadastro efetuado com sucesso";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
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
