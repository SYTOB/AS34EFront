import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-panel',
  templateUrl: './my-panel.component.html',
  styleUrls: ['./my-panel.component.scss']
})
export class MyPanelComponent implements OnInit {


  aux: any = localStorage.getItem('user');
  user: any = JSON.parse(this.aux);

  constructor() { }

  ngOnInit() {
  }

}
