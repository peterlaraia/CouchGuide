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
    const s = `${season === undefined || season === null ? '' : 'S' + season}`;
    const e = `${num === undefined || num === null ? '' : 'E' + num}`;
    return `${s} ${e}`.trim();
  }
}
