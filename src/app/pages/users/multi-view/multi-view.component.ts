import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators'
import { XUserService } from '../../../@core/mock/user.service';
import { useAnimation } from '@angular/animations';

@Component({
  selector: 'multi-view',
  templateUrl: './multi-view.component.html',
  styleUrls: ['./multi-view.component.scss'],
  providers: [XUserService]
})
export class MultiViewComponent implements OnInit {

  @ViewChild('usr') usr

  items = [{ title: 'View'}, { title: 'Edit' }, { title: 'Remove' }];
  users: Array<any>
  constructor(private userService: XUserService, private nbMenuService: NbMenuService) {

    let usrArr = []
    userService.getUsers().subscribe(objs => {

      objs.forEach(usr => {
        usrArr.push(
          {
            name: `${usr.firstName} ${usr.lastName}`,
            title: `${usr.email}`,
            id:`${usr.uid}`
          })
      })

      this.users = usrArr
    })
  }

  ngOnInit() {

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-view-menu'),
       // map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        // switch (title) {
        //   case 'Remove':
        //     console.log("Removed")
        //     break;

        //   case 'Edit':
        //     console.log("Edited")
        //     break;

        //     case 'View':
        //     console.log("Viewed")
        //     break;
        //}
        console.log(this.usr)
      });
  }

}
