import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', loadChildren: './search/search.module#SearchModule'},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
