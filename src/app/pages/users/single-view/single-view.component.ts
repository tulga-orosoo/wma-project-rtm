import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { XUserService } from '../../../@core/mock/user.service';
import { MessageService } from '../../../@core/mock/message.service';

@Component({
  selector: 'single-view',
  templateUrl: './single-view.component.html',
  styleUrls: ['./single-view.component.scss'],
  providers: [XUserService]
})
export class SingleViewComponent implements OnInit, OnDestroy {

  user = {
    firstName: '',
    lastName: '',
    title: '',
    phone: '',
    email: '',
    id: ''
  }

  constructor(private route: ActivatedRoute, private userService: XUserService, private msgService: MessageService, private router: Router) {

    route.queryParams.subscribe(params => {
      const { id } = params

      userService.getSingleUser(id).subscribe(user => {

        this.user.firstName = `${user.firstName}`
        this.user.lastName = `${user.lastName}`
        this.user.email = `${user.email}`
        this.user.phone = user.phoneNumber
        this.user.id = user.uid
      })

    })
  }

  onBtnUpdate() {
    this.router.navigate(['pages','users','edit'], { queryParams: { id: this.user.id } })
  }

  onBtnDelete() {

    const deleteNotification = {
      message: `User: ${this.user.firstName} ${this.user.lastName} has been deleted`,
      type: 'warning',
      title: 'Deletion Successful'
    }

    this.userService.deleteUser(this.user.id).subscribe(() => {
      this.router.navigate(['pages', 'users'])
      this.msgService.sendMessage(deleteNotification)
    })
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }
}
