import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Network } from '../../models/network';

@Component({
  selector: 'cg-misc-info',
  templateUrl: './misc-info.component.html',
  styleUrls: ['./misc-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiscInfoComponent {

  readonly minutesPerHour = 60;

  @Input() runtime: number; // in minutes
  @Input() genres: string[];
  @Input() network: Network;
  @Input() isWebchannel: boolean;

  displayRuntime(runtime: number): string {
    if (runtime === 0) {
      return '0m';
    } else if (runtime === undefined || runtime === null) {
      return 'Data unavailable';
    }
    const {hours, minutes} = {
      hours: Math.floor(runtime / this.minutesPerHour),
      minutes: runtime % this.minutesPerHour
    };
    const hourString = hours ? `${hours}h` : '';
    const minuteString = minutes ? `${minutes}m` : '';
    return `${hourString} ${minuteString}`.trim();
  }

  flagAsset(countryCode: string): string {
    return `assets/img/flags/${countryCode && countryCode.toLocaleLowerCase()}.svg`;
  }

  networkUrl(id: number, name: string, webChannel?: boolean): string {
    const cleanName: string = name && name.toLocaleLowerCase().split(' ').join('-');
    return `${environment.maze_web_url}/${webChannel ? 'webchannels' : 'networks'}/${id}/${cleanName}`;
  }
}
