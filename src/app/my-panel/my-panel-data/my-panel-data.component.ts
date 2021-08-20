import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';

@Component({
  selector: 'app-my-panel-data',
  templateUrl: './my-panel-data.component.html',
  styleUrls: ['./my-panel-data.component.scss']
})
export class MyPanelDataComponent implements OnInit {

  formulario!: FormGroup;

  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService
  ) { }

  ngOnInit() {

    this.formulario = this.formBuilder.group({
      nome: [this.user.nickname, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      cpf: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      email: ["diovanips@hotmail.com", [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
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

}
