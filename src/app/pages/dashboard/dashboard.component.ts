import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private  db:  AngularFireDatabase) { }
  ngOnInit() {

  }

  data:any = null;

  getDate() {
    let items = this.db.list('data/tanks').valueChanges().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }
}
