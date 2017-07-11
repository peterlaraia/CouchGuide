import { ContentChild, Directive, HostBinding, Input, TemplateRef } from '@angular/core';

@Directive({ selector: '[pvl-tab]' })
export class TabDirective {
    @HostBinding('class.active-tab') active: boolean = false;
    @ContentChild(TemplateRef) ref: TemplateRef<any>;
    @Input('tabId') id: string;

    ngOnInit() {
        this.id = this.id || 'tab-'+Math.floor(Math.random() * 1000);
        console.log('start tab')
        console.log(this.id);
    }
    
    ngAfterContentInit() {
        console.log('blurb', this.ref);
    }

    constructor() { }
}