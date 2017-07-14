import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cg-handshake',
    template: `
    <div class="handshake left-hand">
        <ng-content select=[left]></ng-content>
    </div>
    <div class="handshake right-hand">
        <ng-content select=[right]></ng-content>
    </div>
    `,
    styleUrls: ['./handshake.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HandshakeComponent {
}