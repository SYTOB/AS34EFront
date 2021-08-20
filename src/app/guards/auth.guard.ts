import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {



  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):Observable<boolean> | boolean{

    return this.verificarAcesso();

  }

  private verificarAcesso(){

    if(localStorage.getItem('token')){
      return true;
    }else{
      this.router.navigate(['/home']);
      return false;
    }

  }

  usuarioAuth() {
    throw new Error('Method not implemented.');
  }

  canLoad(route: Route): Observable<boolean>|boolean {
      console.log("Verificando se o usuario pode carregar rota.");
      console.log("Retorno: ", this.verificarAcesso());
      return this.verificarAcesso();
  }

}
