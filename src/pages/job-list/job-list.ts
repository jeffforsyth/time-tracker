import { Component } from '@angular/core';
import { Config, IonicPage, NavController } from 'ionic-angular';

//import {JobService} from '../../providers/job-service-mock';
import {JobService} from '../../providers/job-service';

@IonicPage()
@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {
  
  jobs: Array<any>;
  searchKey: string = "";

  constructor(public navCtrl: NavController, public jobService: JobService, public config: Config) {
    this.findAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JobListPage');
  }

  onInput(event) {

    this.jobService.findByName(this.searchKey)
        .then(data => {
            this.jobs = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  openJobDetail(job: any) {
    //this.navCtrl.push(JobDetailPage, job);
  }

  onCancel(event) {
      this.findAll();
  }

  findAll() {
      this.jobService.getJobs()
          .then(data => this.jobs = data)
          .catch(error => alert(error));
  }

}
