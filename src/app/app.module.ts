import { BrowserModule } from '@angular/platform-browser';
import { HttpModule  } from '@angular/http/';
import { ErrorHandler, NgModule } from '@angular/core';
import { AlertController, IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComunicacaoProvider } from '../providers/comunicacao/comunicacao';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ComunicacaoProvider,
    AlertController
  ]
})
export class AppModule {}
