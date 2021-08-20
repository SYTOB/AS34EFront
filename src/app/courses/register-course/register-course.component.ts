import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { FormValidComponent } from 'src/app/shared/form-valid/form-valid.component';
import { ValidEmailService } from 'src/app/shared/services/validEmail.service';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss']
})
export class RegisterCourseComponent implements OnInit {

  formulario!: FormGroup;
  listStatus: string[] = ['Disponivel','Indisponivel'];
  listPeriodo: string[] = ['Mensal','Semestral','Anual'];


  constructor(
    private formBuilder: FormBuilder,
    private verificaEmailService: ValidEmailService,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      valor: [null, [Validators.required] ],
      periodo: [null,[Validators.required]],
      status: [null, [Validators.required]],
      descricao: [null, [Validators.required] ]
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
