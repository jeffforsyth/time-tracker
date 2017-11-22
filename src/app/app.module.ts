import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TimesheetPage } from '../pages/timesheet/timesheet';
import { AccountPage } from '../pages/account/account';
import { JobListPage } from '../pages/job-list/job-list';
import { TabsPage } from '../pages/tabs/tabs';
import { JobService } from '../providers/job-service-mock';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TimesheetPage,
    AccountPage,
    TabsPage,
    JobListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    TimesheetPage,
    AccountPage,
    JobListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    JobService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}    
  ]
})
export class AppModule {}
