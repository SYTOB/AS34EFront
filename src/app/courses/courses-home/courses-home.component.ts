import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent implements OnInit {

  count!: any[];

  constructor() { }

  ngOnInit() {

    this.count = ["Angular","Java","NetBeans","Python","Culinaria","Marcenaria"];
    console.log(this.count.length);

  }

}
