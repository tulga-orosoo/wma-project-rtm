import { Component, OnInit } from '@angular/core';
import { XUserService } from '../../@core/mock/user.service';
import { NbMenuService } from '@nebular/theme';
import {filter,map} from 'rxjs/operators'

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [XUserService]
})
export class UsersComponent implements OnInit {

  items = [{title:'View'},{ title: 'Edit' }, { title:'Remove'}];
  users: Array<any>
  constructor(private userService: XUserService,private nbMenuService:NbMenuService) {
    
    let usrArr=[]
    userService.getUsers().subscribe(objs => {

      objs.forEach(usr => {
        usrArr.push(
          {
            name: `${usr.firstName} ${usr.lastName}`,
            title: `${usr.email}`
          })
      })

      this.users=usrArr
    })
  }

  ngOnInit() {

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => console.log(`${title} was clicked!`));
  }

}
