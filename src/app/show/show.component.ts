import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../models/show';

@Component({
  selector: 'cg-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss', './show.component.small.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowComponent implements OnInit {

  show: Show;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe((data: {show: Show}) => {
      this.show = data.show;
    });
  }

}
