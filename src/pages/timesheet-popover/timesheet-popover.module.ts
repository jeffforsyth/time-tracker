import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimesheetPopoverPage } from './timesheet-popover';

@NgModule({
  declarations: [
    TimesheetPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(TimesheetPopoverPage),
  ],
})
export class TimesheetPopoverPageModule {}
