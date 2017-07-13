import { Component, Input } from '@angular/core';
import { Network } from "../../models/network";

@Component({
  selector: 'cg-misc-info',
  templateUrl: './misc-info.component.html',
  styleUrls: ['./misc-info.component.scss', './misc-info.component.small.scss']
})
export class MiscInfoComponent {

  readonly minutesPerHour: number = 60;

  @Input() runtime: number; //in minutes
  @Input() genres: string[];
  @Input() network: Network;

  displayRuntime(runtime: number): string {
    let {hours, minutes} = {
      hours: Math.floor(runtime/this.minutesPerHour),
      minutes: runtime % this.minutesPerHour
    };
    let hourString = hours ? `${hours}h` : '';
    let minuteString = minutes ? `${minutes}m` : '';
    return `${hourString} ${minuteString}`
  }
}
