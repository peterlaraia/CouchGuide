import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[pvl-tab]' })
export class TabDirective {
    @HostBinding('class.active-tab') active: boolean = false;
    @Input() ref: any;
    @Input('tabId') id: string;

    ngOnInit() {
        console.log(this.id);
        this.id = this.id || 'tab-'+Math.floor(Math.random() * 1000);
        console.log('start tab')
        console.log(this.id);
        console.log(this.ref);
    }

    constructor() { }
}