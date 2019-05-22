import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { AuthService } from  '../../../auth/auth.service';
import { auth } from 'firebase/app';
import { User } from  'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  userSub:any;
  uid = '';

  userMenu = [
    { title: 'Profile', 'link': '/pages/users/' + this.uid + '?id=' + this.uid },
    { title: 'Log out', link: '/auth/logout'  }
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private authService: AuthService,
              public  afAuth:  AngularFireAuth,
              private db: AngularFireDatabase) {

                this.afAuth.authState.subscribe(user => {
                  if (user) {
                    this.userSub = this.db.object('data/users/'+user.uid).valueChanges().subscribe(data => {
                      this.userSub.unsubscribe();
                      this.user = data;
                      this.user.id = user.uid;
                      this.uid = user.uid;
                      console.log(this.user);
                    });
                  } else {
                  }
                })
  }


  ngOnInit() {
    this.user = this.authService.user;
    console.log(this.user);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
