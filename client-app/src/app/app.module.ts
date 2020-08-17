import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { store } from './app.store';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { DataComponent } from './@features/data/data.component';
import { SetupComponent } from './@features/setup/setup.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    SetupComponent
  ],
  imports: [
    CommonModule,
    NgxsModule.forRoot(store, { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
