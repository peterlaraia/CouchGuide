import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cg-guide-slot',
  templateUrl: './guide-slot.component.html',
  styleUrls: ['./guide-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuideSlotComponent implements OnInit {

  private readonly SLOT_SIZE: number = 20;
  private readonly SLOT_LENGTH: number = 30;

  @Input() name: string;
  @Input() runtime: number;

  @HostBinding('style.left.%')
  @Input() left: number;

  @HostBinding('style.width.%') width: number;

  ngOnInit(): void {
    this.width = (this.runtime/this.SLOT_LENGTH)*this.SLOT_SIZE;
  }
}
