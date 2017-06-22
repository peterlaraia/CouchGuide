import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Show } from "../../models/show";

@Component({
  selector: 'cg-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {

  @Input() shows: Show[];

  constructor(private router: Router) { }

  navigateTo(id: number): void {
    this.router.navigate(['/shows', id]);
  }

}
