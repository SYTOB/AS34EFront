import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-panel-home',
  templateUrl: './my-panel-home.component.html',
  styleUrls: ['./my-panel-home.component.scss']
})
export class MyPanelHomeComponent implements OnInit {

  aux: any = localStorage.getItem('user');
  nome: any = JSON.parse(this.aux);

  constructor() { }

  ngOnInit() {
  }

}
