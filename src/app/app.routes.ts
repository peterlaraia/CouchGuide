import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { ShowComponent } from './show/show.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', loadChildren: './search/search.module#SearchModule'},
    { path: 'shows/:id', loadChildren: './show/show.module#ShowModule'},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];
