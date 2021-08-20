import { Injectable } from '@angular/core';
import PNotify from 'pnotify/dist/es/PNotify';
import PNotifyAnimate from 'pnotify/dist/es/PNotifyAnimate';
import PNotifyDesktop from 'pnotify/dist/es/PNotifyDesktop';
import PNotifyButtons from 'pnotify/dist/es/PNotifyButtons';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';


@Injectable({
  providedIn: 'root'
})
export class PnotifyService {

  public constructor() {

    PNotify.defaults.styling = 'material';
    PNotify.defaults.icons = 'material';

    // tslint:disable:no-unused-expression
    PNotifyStyleMaterial;
    PNotifyAnimate;
    PNotifyDesktop;
    PNotifyButtons;
  }

  public info(message: string, desktop: boolean = false) {
    this.notify(message, 'info', 'Aviso', desktop);
  }

  public notice(message: string, desktop: boolean = false) {
    this.notify(message, 'notice', 'Alerta', desktop);
  }

  public success(message: string, desktop: boolean = false) {
    this.notify(message, 'success', 'Concluído', desktop);
  }

  public error(message: string, desktop: boolean = false) {
    this.notify(message, 'error', 'Erro', desktop);
  }

  public httpError(exc: any = null, desktop: boolean = false): void {

    let message = 'Falha ao conectar no servidor. Verifique sua conexão com a internet.';

    if (exc && exc.error) {

      if (exc.status == 422) {

        message = "";

        Object.keys(exc.error).forEach((campo, index) => {
          message = `${message} ${index > 0 ? '\n' : ''} ${exc.error[campo].join()}`;
        });

      } else if (exc.error.message) {

        message = exc.error.message;
      }

    }

    this.error(message, desktop);
  }

  private notify(message: string, type: string = '', title: string = '', desktop: boolean = false) {

    const params = {
      title: title,
      text: message,
      modules: {
        Desktop: { desktop },
        Animate: { animate: true, inClass: 'zoomInLeft', outClass: 'zoomOutRight' }
      }
    }

    PNotify[type](params);
  }
}
