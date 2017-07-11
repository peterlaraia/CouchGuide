import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'pvl-tab-panel',
    templateUrl: 'tab-panel.component.html',
})

export class TabPanelComponent {

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