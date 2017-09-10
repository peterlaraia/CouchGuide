import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';

@Component({
  selector: 'cg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(private router: Router, private store: Store<fromRoot.State>) { }

  /**
   * @deprecated
   */
  redirectToSearch(): void {
    this.router.navigate(['/search']);
  }

}
