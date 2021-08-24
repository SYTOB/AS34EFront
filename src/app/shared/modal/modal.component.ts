import { AttCatVidService } from './../services/att-cat-vid.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  type: any;

  public confirmSubscription!: Subscription;
  public loading: boolean = false;

  constructor(
    private atualiza: AttCatVidService,
    private notifyService: NotifyService,
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type = data.type ? data.type : 'warn';
  }

  public ngOnInit() {}

  public ngOnDestroy(): void {
    this.confirmSubscription?.unsubscribe();
  }

  public confirm() {
    this.loading = true;

    this.confirmSubscription = this.data.observable.subscribe(
      (response: any) => {
        this.loading = false;

        if (response) {
          this.showToasterSuccess();
          this.atualiza.atualiza();
          this.atualiza.atualizaCurso();
        }

        this.dialogRef.close(true);
      },
      (error: any) => {
        this.loading = false;
        this. showToasterfailed();
      }
    );
  }

  public cancel() {
    this.dialogRef.close(false);
  }

  showToasterSuccess(){
    console.log("teste");
    const titulo = "Sucesso";
    const message = "";
    this.notifyService.showSuccess(message, titulo);
  }

  showToasterfailed(){
    console.log("teste");
    const titulo = "Erro!";
    const message = "Algo de errado ocorreu, por favor tente novamente.";
    this.notifyService.showError(message, titulo);
  }
}
