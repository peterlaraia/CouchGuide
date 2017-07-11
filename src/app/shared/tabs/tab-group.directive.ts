import { ContentChildren, Directive, Input, QueryList, ViewChildren } from '@angular/core';
import { TabPanelComponent } from "./tab-panel.component";
import { TabDirective } from "./tab.directive";

@Directive({ selector: '[pvl-tab-group]' })
export class TabGroupDirective {

    @Input() panel: TabPanelComponent;
    @Input('initialTab') initialTabId: string;
    @ContentChildren(TabDirective) tabs: QueryList<TabDirective>;

    private activeTab: TabDirective;

    ngAfterContentInit() {
        console.log('start tabgroup');
        console.log(this.panel);
        console.log('withtabs', this.tabs)
        console.log(this.tabs.toArray())
        if (!this.idsAreUnique(this.tabs.map((tab: TabDirective) => tab.id))) {
            console.warn('tab ids must be unique!');
        }
        this.setActiveTab(this.initialTabId || this.tabs.first.id);
    }

    setActiveTab(id: string) {
        if (this.activeTab) {
            if (this.activeTab.id === id) {
                return;
            }
            this.clearActiveTab();
        }
        const tab: TabDirective = this.tabs.find((tab: TabDirective) => tab.id === id);
        tab.active = true;

        this.panel.swapInTemplate(tab.ref);
        this.activeTab = tab;
    }

    clearActiveTab(): void {
        this.activeTab.active = false;
        this.activeTab = undefined;
    }



    idsAreUnique(ids: string[]): boolean {
        let idMap: any = {};
        for (let id of ids) {
            if (idMap[id]) {
                return false;
            }
            idMap[id] = true;
        }
        return true;
    }


    constructor() { }
}