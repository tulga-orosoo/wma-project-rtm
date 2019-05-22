import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbToastrService } from '@nebular/theme';
import { XUserService } from '../../../@core/mock/user.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../@core/mock/message.service';
import { NotificationFactory } from '../../../controls/NotificationFactory';


@Component({
  selector: 'multi-view',
  templateUrl: './multi-view.component.html',
  styleUrls: ['./multi-view.component.scss'],
  providers: [XUserService]
})
export class MultiViewComponent implements OnInit{

  items = [{ title: 'View', id: ''}, { title: 'Edit', id: '' }, { title: 'Remove', id: '' }];
  users: Array<any> = []

   notifier=new NotificationFactory(this.tstService)

  constructor(private userService: XUserService,
    private nbMenuService: NbMenuService,
    private tstService: NbToastrService,
    private route:ActivatedRoute,
    private msgService:MessageService,
   ) {
    this.getUsers()
  }


  onSelected(element) {
    this.items.forEach(item => {
      item.id = element.nativeElement.id 
    })
  }

  ngOnInit() {
   
    this.msgService.messenger.subscribe(notification=>{
    this.notifier.makeToast(notification.type,notification.message,notification.title)
    })
  }

  getUsers = () => {
    this.users = []
    this.userService.getUsers().subscribe(objs => {

      objs.forEach(usr => {
        this.users.push(
          {
            name: `${usr.firstName} ${usr.lastName}`,
            title: `${usr.email}`,
            id: `${usr.uid}`
          })
      })

    })
  }


  updateClick(){

  }


}
