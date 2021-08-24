import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  newTab() {
    window.open(
      "https://api.whatsapp.com/send?phone=5543988457219", "_blank");
}

}
