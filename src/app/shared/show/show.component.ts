import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cg-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowComponent implements OnInit {

  id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];

    console.log(id);
    this.id = id;
  }

}
