import { Component, Input, OnInit } from '@angular/core';

import { Show } from "../../models/show";

@Component({
  selector: 'cg-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() shows: Show[];

  constructor() { }

  ngOnInit() {
  }

}
