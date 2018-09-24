import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { PagesImportsPage } from '../pages/pages-imports/pages-imports';
import { MenuPage } from '../pages/menu/menu';
import { AuthPage } from '../pages/auth/auth';
import { DetailsPage } from '../pages/details/details';
import { SendPage } from '../pages/send/send';
import { NetPage } from '../pages/net/net';
import { ScanerPage } from '../pages/scaner/scaner';

import { Repository } from '../service/local/storage';
import { storageConfig } from './global';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { Clipboard } from '@ionic-native/clipboard';
import { HTTP } from '@ionic-native/http';
import { QRScanner } from '@ionic-native/qr-scanner';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    PagesImportsPage,
    MenuPage,
    AuthPage,
    DetailsPage,
    SendPage,
    NetPage,
    ScanerPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(storageConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    MenuPage,
    AuthPage,
    DetailsPage,
    SendPage,
    PagesImportsPage,
    NetPage,
    ScanerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Repository,
    Clipboard,
    QRScanner,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
