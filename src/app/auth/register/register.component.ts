import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { XUserService } from '../../@core/mock/user.service';
import { XUser } from '../../@core/data/user';
import { NgForOfContext } from '@angular/common';
import { NgForm } from '@angular/forms';
import { NbToastRef, NbToastrService } from '@nebular/theme';
import { MessageService } from '../../@core/mock/message.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [XUserService]
})
export class RegisterComponent implements OnInit {

  tstRef: NbToastRef

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
    private router: Router, private tstRefService: NbToastrService,
    private msgService: MessageService, public afAuth: AngularFireAuth) { }

  getConfigValue(terms): any { return terms }

  register(form: NgForm): void {

    const userName = this.user.fullName.split(" ")


    const notification = {
      type: '',
      message: '',
      title: ''
    }

    this.afAuth.auth.createUserWithEmailAndPassword(this.user.email,this.user.password).then(cred=>{

      const userObj = new XUser.Builder()
      .setId(cred.user.uid)
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

          notification.message = response.message
          notification.title = "Sucesss"
          notification.type = "success"
          this.msgService.sendMessage(notification)
          form.resetForm()
          this.router.navigate(['pages'])
        }
        else {
          this.tstRef = this.tstRefService.danger(`${response.message.message}`, "Error")
        }
      })
    })

  }

  ngOnInit() {

  }

}
