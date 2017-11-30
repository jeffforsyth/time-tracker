import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { TimesheetPopoverPage } from '../timesheet-popover/timesheet-popover';

@IonicPage()
@Component({
  selector: 'page-timesheet',
  templateUrl: 'timesheet.html',
})
export class TimesheetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  }
  
  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(TimesheetPopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimesheetPage');
  }

}
