import { AttCatVidService } from './../services/att-cat-vid.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotifyService } from '../services/notify.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.scss'],
})
export class ModalVideoComponent implements OnInit, OnDestroy {
  type: any;

  public confirmSubscription!: Subscription;
  public loading: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<ModalVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.type = this.sanitizer.bypassSecurityTrustResourceUrl(data.url);
  }

  public ngOnInit() {
    console.log("Type:", this.type);
  }

  public ngOnDestroy(): void {
    this.confirmSubscription?.unsubscribe();
  }



  public cancel() {
    this.dialogRef.close(false);
  }

}
