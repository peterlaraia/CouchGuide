import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
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

  flagAsset(countryCode: string): string {
    return `assets/img/flags/${countryCode.toLocaleLowerCase()}.svg`;
  }

  flagLinkUrl(countryCode: string): string {
    return `url('assets/img/flags/${countryCode.toLocaleLowerCase()}.svg')`;
  }

  networkUrl(id: number, name: string): string {
    return `${environment.maze_web_url}/networks/${id}/${name.toLocaleLowerCase().split(' ').join('-')}`
  }
}
