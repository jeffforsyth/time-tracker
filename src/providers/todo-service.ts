import { Injectable } from '@angular/core';

declare var WindowsAzure: any;
var table: any;
var syncContext: any;
var client: any;

@Injectable()
export class TodoService {
  data: any;
  isInitialized: boolean;
  
  constructor() {    
  }    
    

  setup () {    
             
    let client = new WindowsAzure.MobileServiceClient('https://paragon-dev-timesheet.azurewebsites.net'); // define the client
    
    syncContext = client.getSyncContext(); // get the sync context from the client
    syncContext.pushHandler = {
      onConflict: function (pushError) {
          // Handle the conflict
      },
      onError: function (pushError) {
          // Handle the error
      }
    };
    
    var store = new WindowsAzure.MobileServiceSqliteStore('store.db');   
    var todoItemTable;   

    return store.defineTable({
      name: 'todoitem',
      columnDefinitions: {
        id: 'string',
        deleted: 'boolean',
        text: 'string',
        version: 'string',
        complete: 'boolean'
      }
    })
    .then(function() {   
      console.log("done defineTable");        
      return syncContext.initialize(store);                    
    })
    .then(function() {   
      console.log("done syncContext.initialize");           
      table = client.getSyncTable('todoitem');     
    });      
  } 

  getTodos() {        
     return this.setup()
      .then(function() {     
        console.log("returned from setup with table : " + table.getTableName() ) 

        var query = new WindowsAzure.Query('todoitem' /* table name */),
          queryId = 'all_todo_items',
          pullSettings = {
            pageSize: 75
          };
          syncContext
          .pull(query, queryId, pullSettings)
          .then(function() { 
            /* pull complete */ 
          })
          .then(null, (err) => console.log("rejected Sync:", err.message));  //this is how we need to handle errors
        
      })
      .then(function() {   
        console.log('before read');      
        return table.read();
      }) 
      .then(null, (err) => console.log("rejected:", err.message)); //this is how we need to handle errors
      
  }

  addTodo() {
    var item = { test: 'Item 1', complete: false };
    client.getTable('todoitem').insert(item);
  }

}