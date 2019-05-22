import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MessageService } from '../@core/mock/message.service';
import { NotificationFactory } from '../controls/NotificationFactory';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
    <nb-alert status="success">
     {{message}}
     </nb-alert>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
  providers: [MessageService]
})
export class PagesComponent implements OnInit {
 
  menu = MENU_ITEMS;

  notifier = new NotificationFactory(this.toasterService)

  constructor(private msgService: MessageService, private toasterService: NbToastrService) {
    
  }

  ngOnInit(): void {
    this.msgService.messenger.subscribe(notification =>{
      this.notifier.makeToast(notification.type, notification.message, notification.title)
     console.log("Hello")
     })
  }

}
