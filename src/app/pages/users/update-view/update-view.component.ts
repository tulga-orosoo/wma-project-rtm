import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NbToastRef, NbToastrService } from '@nebular/theme';
import { XUserService } from '../../../@core/mock/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../@core/mock/message.service';
import { NgForm } from '@angular/forms';
import { XUser } from '../../../@core/data/user';

@Component({
  selector: 'update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss'],
  providers:[XUserService]
})
export class UpdateViewComponent implements OnInit {

  tstRef:NbToastRef

  user = {
    fullName: '',
    email: '',
    password: '',
    terms: '',
    phoneNumber: '',
    confirmPassword: ''
  }

  Messages = { error: false, success: false }
  errors: Array<String>

  constructor(private userService: XUserService, cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,private tstRefService:NbToastrService,
    private msgService:MessageService,private router:Router,elemRef:ElementRef) {

      activatedRoute.fragment.subscribe(frag=>{
        console.log(frag)
      })

      //userService.getSingleUser()

     }

  getConfigValue(terms): any { return terms }

  register(form: NgForm): void {

    const userName = this.user.fullName.split(" ")

    const userObj = new XUser.Builder()
      .setFirstName(userName[0])
      .setLastName(userName[1])
      .setEmail(this.user.email)
      .setPhoneNumber(this.user.phoneNumber)
      .setPassword(this.user.password)
      .setPhoto("http://www.photos.com")
      .build()

    this.userService.serverCreateUser(userObj)
      .subscribe(response => {
        if (response.status == "Success") {
          //this.tstRef=this.tstRefService.success(`${response.status}`,"Success")
          this.msgService.sendMessage(`${response.status}`)
          form.resetForm()
          this.router.navigate(['pages'])
        }
        else{
          this.tstRef=this.tstRefService.danger(`${response.message.message}`,"Error")
        }
      })
  }

  ngOnInit() {

  }

}
