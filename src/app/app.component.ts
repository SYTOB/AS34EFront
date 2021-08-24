

import { AuthService } from './login/auth.service';
import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { NotifyService } from './shared/services/notify.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  preserveWhitespaces: true
})
export class AppComponent {

  mostrarMenu!: boolean;
  inscricao!: Subscription;



  title = 'AS34ECursos';
  public opened: boolean = false;

  constructor(private auth: AuthService, private notifyService: NotifyService) {

    this.setSidebarMode();

    window.onresize = () => this.setSidebarMode();

  }

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.mostrarMenu = true;
      // this.auth.mostrarMenuEmitter.emit(true);
    }else{
      this.mostrarMenu = false;
      // this.auth.mostrarMenuEmitter.emit(false);
    }

    this.inscricao = this.auth.mostrarMenuEmitter.subscribe(
      (mostrar: boolean) => this.mostrarMenu = mostrar,
      console.log(this.mostrarMenu)
    );

  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "parabenfj dshf sdhb fsd fksd s";
    this.notifyService.showSuccess(titulo, message);
}

  onActivate(event:any) {
    window.scroll(0,0);
    //or document.body.scrollTop = 0;
  }

  out(){
    this.mostrarMenu = false;
    // this.auth.mostrarMenuEmitter.emit(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


  public setSidebarMode() {
    const screenWidth = window.innerWidth;
    this.opened = screenWidth > 960;
  }


  }

