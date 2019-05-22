import { Component, OnInit } from '@angular/core';
import { XUserService } from '../../@core/mock/user.service';
import { NbMenuService } from '@nebular/theme';


@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [XUserService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: XUserService,private nbMenuService:NbMenuService) { }

  ngOnInit() {}

}
