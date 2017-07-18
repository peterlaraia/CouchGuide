import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Episode } from '../../models/episode';

@Component({
  selector: 'cg-next-episode',
  templateUrl: './next-episode.component.html',
  styleUrls: ['./next-episode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NextEpisodeComponent {
  @Input() episode: Episode;
  @Input() loading: boolean;

  displayEpisodeNumber(season: number, num: number): string {
    return `S${season} E${num}`;
  }

  displayAirtime(timestamp: string): string {
    const date: Date = new Date(timestamp);
    return `${date.toDateString()} at ${date.toLocaleTimeString()}`;
  }
}
