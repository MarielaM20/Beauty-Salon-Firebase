import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { AngularFireModule } from "angularfire2";
//import { AngularFireDatabaseModule } from "angularfire2/database";

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { ViewsModule } from './views/views.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { appInterceptorProvider } from './app.interceptor';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    AuthModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    //AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    CoreModule,
    HttpClientModule,
    SharedModule,
    ViewsModule,
    SharedModule
  ],
  providers: [
    appInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
