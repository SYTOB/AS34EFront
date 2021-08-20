import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-valid',
  templateUrl: './form-valid.component.html',
  styleUrls: ['./form-valid.component.scss']
})
export class FormValidComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  static equalsTo(otherField: string){
    const validator = (formControl: FormControl) => {
      if(otherField == null){
        throw new Error('É necessário informar um campo!');
      }

      if(!formControl.root || !(<FormGroup>formControl.root).controls){
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if(!field){
        throw new Error('É necessário informar um campo válido!');
      }

      if(field.value !== formControl.value){
        return { equalsTo : otherField }

      }
        return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any){
    // const config = {
    //   'required': `${fieldName} é obrigatório.`,
    //   'minlength': `${fieldName} precisa ter no mínimo ${validatorValue} caracteres.`,
    //   'maxlength': `${fieldName} precisa ter no máximo ${validatorValue} caracteres.`,
    //   'equalsTo': `Emails precisam ser iguais.`
    // };
    const  config: Map<string, string> = new Map<string, string>();

    config.set('required', `${fieldName} é obrigatório.`)
    config.set('minlength', `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`)
    config.set('maxlength', `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`)
    config.set('equalsTo', `Emails precisam ser iguais.`)



    return config.get(validatorName);

  }
}
