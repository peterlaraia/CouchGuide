import { Routes } from '@angular/router';

import { ShowComponent } from './show.component';
import { ShowResolver } from "./show-resolver.service";

export const showRoutes: Routes = [
    { 
        path: '', 
        component: ShowComponent,
        resolve: {
            show: ShowResolver
        }
    }
];
