import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, NgZone, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEventPattern';

@Directive({
    selector: '[mediaQuery]'
})
export class MediaQuery {
    private mq: MediaQueryList;
    private changeSubscription: Subscription;
    private viewRef: EmbeddedViewRef<any>;

    constructor(
        private template: TemplateRef<any>, 
        private viewContainerRef: ViewContainerRef, 
        private zone: NgZone, 
        private cdr: ChangeDetectorRef) {
    }

    @Input()
    set mediaQuery(query: string) {
        if (this.mq) {
            this.cleanUp();
        }

        this.setup(query);
    }

    ngOnDestroy() {
        this.cleanUp();
    }

    private setup(query: string) {
        console.log('setup');
        this.mq = window.matchMedia(query);

        this.changeSubscription = Observable.fromEventPattern(
            (handler: MediaQueryListListener) => this.mq.addListener(handler),
            (handler: MediaQueryListListener) => this.mq.removeListener(handler)
        ).subscribe(this.handleMediaQuery);
        this.onChanges(this.mq.matches);
    }

    private cleanUp() {
        this.mq = null;
        this.changeSubscription.unsubscribe();
    }

    private handleMediaQuery = (mq) => {
        this.zone.run(() => this.onChanges(mq.matches));
    }

    private onChanges = (matches: boolean) => {
        if (matches && !this.viewRef) {
            console.log('yes');
            this.viewRef = this.viewContainerRef.createEmbeddedView(this.template);
        } else if (!matches && this.viewRef) {
            console.log('no');
            this.viewContainerRef.clear();
            this.viewRef.destroy();
            this.viewRef = undefined;
        }
        this.cdr.markForCheck();
    }
}
