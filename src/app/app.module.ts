import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Config } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ElectronProvider } from '../providers/electron/electron';
import { LoveromsProvider } from '../providers/loveroms/loveroms';

import { ModalEnterFadeIn, ModalLeaveFadeOut } from '../transitions/modal-fade';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ElectronProvider,
    LoveromsProvider
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
  }

  private setCustomTransitions() {
    this.config.setTransition('ModalEnterFadeIn', ModalEnterFadeIn);
    this.config.setTransition('ModalLeaveFadeOut', ModalLeaveFadeOut);
  }
}
