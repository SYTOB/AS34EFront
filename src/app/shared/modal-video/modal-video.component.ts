import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-video',
  templateUrl: './modal-video.component.html',
  styleUrls: ['./modal-video.component.scss']
})
export class ModalVideoComponent implements OnInit {

  type:any;

  constructor(private dialogRef: MatDialogRef<ModalVideoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){

      this.type = data.type ? data.type : 'warn';

   }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
