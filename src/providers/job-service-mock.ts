import { Injectable } from '@angular/core';

import jobs from './mock-jobs';

@Injectable()
export class JobService {

  findAll() {
    return Promise.resolve(jobs);
  }

  findById(id) {
    return Promise.resolve(jobs[id - 1]);
  }

  findByName(searchKey: string) {
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(jobs.filter((property: any) =>
        (property.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
  }


}
