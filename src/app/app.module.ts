import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SocialSharing } from '@ionic-native/social-sharing';

import { MyApp } from './app.component';

// TODO: Lazy load pages
import { HomePage } from '../pages/home/home';
import { SummaryPage } from '../pages/summary/summary';
import { EditCardPage } from '../pages/edit-card/edit-card';

import { CostSplitCalculatorProvider } from '../providers/cost-split-calculator/cost-split-calculator';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SummaryPage,
    EditCardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SummaryPage,
    EditCardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CostSplitCalculatorProvider
  ]
})
export class AppModule {}
