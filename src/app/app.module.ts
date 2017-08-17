import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { environment } from 'environments/environment';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { reducers } from './store/reducers';

let imports: any[] = [
  BrowserModule,
  CoreModule,
  FormsModule,
  HttpClientModule,
  HomeModule,
  RouterModule.forRoot(
    appRoutes,
    {
      preloadingStrategy: PreloadAllModules
    }
  ),
  StoreModule.provideStore(reducers)
];

if (!environment.production) {
  imports = [
    ...imports,
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 25
    })
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: imports,
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
