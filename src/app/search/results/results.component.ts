import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Show } from '../../models/show';
import { SslService } from '../../core/ssl/ssl.service';

@Component({
  selector: 'cg-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss', './results.component.small.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {

  @Input() shows: Show[];

  constructor(private router: Router, public sslService: SslService) { }

  navigateTo(id: number): void {
    this.router.navigate(['/shows', id]);
  }

}
