import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class JobService {

  data: any;
  db: any;
  remote: any;
 
  constructor() {
    
       this.db = new PouchDB('yellowsheets');
    
       this.remote = 'http://localhost:5984/yellowsheets';
    
       let options = {
         live: true,
         retry: true,
         continuous: true
       };
    
       this.db.sync(this.remote, options);
    
     }
    
  findAll() {
  //  return Promise.resolve(jobs);
  }

  findById(id) {
  //  return Promise.resolve(jobs[id - 1]);
  }

  findByName(searchKey: string) {
    /*
    let key: string = searchKey.toUpperCase();
    return Promise.resolve(jobs.filter((property: any) =>
        (property.title +  ' ' +property.address +  ' ' + property.city + ' ' + property.description).toUpperCase().indexOf(key) > -1));
    */
    return this.getJobs();
  }

  getJobs() {
    
    if (this.data) {
      return Promise.resolve(this.data);
    }
   
    return new Promise(resolve => {
   
      this.db.allDocs({
   
        include_docs: true
   
      }).then((result) => {
   
        this.data = [];
   
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
        });
   
        resolve(this.data);
   
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
   
      }).catch((error) => {
   
        console.log(error);
   
      });
   
    });
   
  }
    
  createJob(job){
    this.db.post(job);
  }

  updateJob(job){
    this.db.put(job).catch((err) => {
      console.log(err);
    });
  }

  deleteJob(job){
    this.db.remove(job).catch((err) => {
      console.log(err);
    });
  }

  handleChange(change){
    let changedDoc = null;
    let changedIndex = null;
   
    this.data.forEach((doc, index) => {
   
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
   
    });
   
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {
   
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }
   
      //A document was added
      else {
        this.data.push(change.doc);
      }
   
    }
  }


}
