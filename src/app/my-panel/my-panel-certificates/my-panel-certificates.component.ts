import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-panel-certificates',
  templateUrl: './my-panel-certificates.component.html',
  styleUrls: ['./my-panel-certificates.component.scss']
})
export class MyPanelCertificatesComponent implements OnInit {

  certificados: any[] = [1,2,3,4,5];

  constructor() { }

  ngOnInit() {
  }

}
