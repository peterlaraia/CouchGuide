import { Directive, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[pvl-tab-panel]', exportAs: 'pvlTabPanel' })
export class TabPanelDirective {
    private viewRef: EmbeddedViewRef<any>;

    constructor(private vcr: ViewContainerRef) { }

    swapInTemplate(template: TemplateRef<any>) {
        console.log('swappingIn', template);
        console.log((<any>template)._parentView);
        this.vcr.clear();
        if (this.viewRef) {
            this.viewRef.destroy();
        }
        this.viewRef = this.vcr.createEmbeddedView(template);
    }
}