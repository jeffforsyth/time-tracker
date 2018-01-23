import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {TodoService} from '../../providers/todo-service';



@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  todos: Array<any>;

  constructor(public todoService: TodoService) {
    this.findAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  findAll() {
    this.todoService.getTodos()
    .then(data => this.todos = data)
    .catch(error => alert(error));
  }

}
